import { ReactNode } from 'react';
import { ExperimentProvider } from 'gestalt';
import { useAppContext } from '../appContext';

/**
 * To implement experimental behavior in the docs:
 * - Add your experiment name here
 * - Unless you want the experimental behavior live on the docs for everyone, REMOVE YOUR EXPERIMENT HERE before merging your PR!
 * */

const enabledExperiments = {
  Dropdown: ['web_gestalt_popover_v2_dropdown', 'mweb_gestalt_popover_v2_dropdown'],
  Popover: ['web_gestalt_popover_v2', 'mweb_gestalt_popover_v2'],
  Tooltip: ['web_gestalt_tooltip_v2', 'mweb_gestalt_tooltip_v2'],
} as const;

type Experiment = {
  anyEnabled: boolean;
  group: string;
};

function buildExperimentsObj(experiments: ReadonlyArray<string>) {
  return experiments.reduce<Record<string, any>>(
    (acc: Record<string, Experiment>, cur: string) => ({
      ...acc,
      [cur]: { anyEnabled: true, group: 'enabled' },
    }),
    {},
  );
}

export function useDocsExperiments(): Record<string, Experiment> {
  const { experiments } = useAppContext();

  // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly Dropdown: readonly ["web_gestalt_popover_v2_dropdown", "mweb_gestalt_popover_v2_dropdown"]; readonly Popover: readonly ["web_gestalt_popover_v2", "mweb_gestalt_popover_v2"]; readonly Tooltip: readonly [...]; }'.
  return buildExperimentsObj(!experiments ? [] : enabledExperiments[experiments] ?? []);
}

type Props = {
  children: ReactNode;
};

export default function DocsExperimentProvider({ children }: Props) {
  const experiments = useDocsExperiments();
  // @ts-expect-error - TS2322 - Type '{ children: ReactNode; value: Record<string, Experiment>; }' is not assignable to type 'IntrinsicAttributes & ExperimentProviderProps & { children?: ReactNode; }'.
  return <ExperimentProvider value={experiments}>{children}</ExperimentProvider>;
}
