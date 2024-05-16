import { ReactNode } from 'react';
import { LiveError, LivePreview, LiveProvider } from 'react-live';
import { Box, Flex, HelpButton, Link, Text } from 'gestalt';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import * as gestaltChart from 'gestalt-charts'; // eslint-disable-line import/no-namespace
import * as gestaltDatepicker from 'gestalt-datepicker'; // eslint-disable-line import/no-namespace
import { useAppContext } from './appContext';
import theme from './atomDark';
import ExampleCode from './ExampleCode';

const reactImports = [
  'Children',
  'Fragment',
  'PureComponent',
  'Profiler',
  'StrictMode',
  'Suspense',
  'cloneElement',
  'createContext',
  'createElement',
  'createFactory',
  'createRef',
  'forwardRef',
  'isValidElement',
  'lazy',
  'memo',
  'startTransition',
  'useCallback',
  'useContext',
  'useDebugValue',
  'useEffect',
  'useImperativeHandle',
  'useLayoutEffect',
  'useMemo',
  'useReducer',
  'useRef',
  'useId',
  'useState',
];

const reactRegex = new RegExp(`(${reactImports.join('|')})`, 'g');

const importsToRemove = ['gestalt', 'gestalt-charts', 'gestalt-datepicker', 'react'];

const importsToRemoveRegex = new RegExp(
  `import (.|\n)*(${importsToRemove.map((item) => `'${item}'`).join('|')});`,
  'g',
);

export default function DevelopmentEditor({
  code,
}: {
  code: string | null | undefined | (() => ReactNode);
}) {
  const { devExampleMode } = useAppContext();

  if (devExampleMode === 'default') {
    return null;
  }

  const scope = { ...gestalt, ...gestaltChart, ...gestaltDatepicker } as const;

  const codeFileCleaned = code
    ?.toString()
    // Remove imports
    .replace(importsToRemoveRegex, '')
    // Remove export statement
    .replace('export default', 'const App =')
    // Add React. to React imports
    .replace(reactRegex, 'React.$&')
    .replace(
      'const [showComponent, setShowComponent] = React.useState(true);',
      'const [showComponent, setShowComponent] = React.useState(false);',
    );

  const codeWrapped = `function Root() {${codeFileCleaned || ''}; return <App />}`;

  return (
    <Box
      color="default"
      dangerouslySetInlineStyle={{ __style: { border: 'thick solid green' } }}
      marginBottom={4}
      padding={2}
      rounding={2}
    >
      <Box padding={2}>
        <Flex gap={2}>
          <Text color="success" weight="bold">
            DEVELOPMENT PREVIEW
          </Text>
          <HelpButton
            accessibilityLabel=""
            accessibilityPopoverLabel="Expanded information about the development editor"
            text={
              <Text size="200">
                This development preview and code editor is only visible in deployed Netlify URLs
                and the development environment
                <br />
                <code>http://localhost:8888</code>. It feeds from TSX files <br />
                <code>docs/examples/*/*.tsx</code>.
                <br />
                <br />
                In production, the default view is enabled. If available, only the Sandpack preview
                and code editor are shown.
                <br />
                <br />
                To enable/disable the development preview, you can enable it on the site settings
                dropdown in the page header.
                <br />
                <br />
                To share a deploy url with this mode enabled, share the nelify url with a
                <br />
                <code>?devexample=true</code>
                <br />
                appended at the end of the url.
                <br />
                <br />
                If the default preview is enabled and you want to render your local changes in
                Sandpack append
                <br />
                <code>?localFiles=true</code>
                <br /> after the component name in the URL.{' '}
                <Link
                  accessibilityLabel="Learn more about the development editor"
                  display="inlineBlock"
                  href="/get_started/developers/contributing/development_process"
                >
                  Learn more
                </Link>
              </Text>
            }
          />
        </Flex>
      </Box>
      {/* @ts-expect-error - TS2322 - Type '{ readonly plain: { readonly backgroundColor: "#2a2734"; readonly color: "#88BBBF"; readonly lineHeight: 1.4; readonly fontSize: 16; readonly fontFamily: "PragmataPro, \"Roboto Mono\", Monaco, Consolas, \"Courier New\", \"Courier, monospace !important"; }; readonly styles: readonly [...]; }' is not assignable to type 'PrismTheme'. */}
      <LiveProvider code={codeWrapped} scope={scope} theme={theme}>
        <Box
          alignItems="center"
          borderStyle="sm"
          color="default"
          display="flex"
          height={500}
          justifyContent="center"
          padding={8}
          position="relative"
          rounding={2}
          width="100%"
        >
          <LivePreview style={{ display: 'contents' }} />
        </Box>
        <ExampleCode code={codeWrapped ?? ''} developmentEditor name="DEVELOPMENT MODE" />

        <Box paddingX={2}>
          <Text color="error">
            <LiveError />
          </Text>
        </Box>
      </LiveProvider>
    </Box>
  );
}
