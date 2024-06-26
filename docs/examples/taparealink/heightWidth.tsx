import { Box, Flex, TapAreaLink, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex gap={6} height={250} maxWidth={500} wrap>
        <Box borderStyle="sm" height="100%" margin={3} width="100%">
          <TapAreaLink
            fullHeight
            href="www.pinterest.com"
            onTap={({ event }) => event.stopPropagation()}
          >
            <Box color="secondary" height="100%">
              <Text align="center">Full parent height</Text>
            </Box>
          </TapAreaLink>
        </Box>
        <Box borderStyle="sm" height="100%" margin={3} width="100%">
          <TapAreaLink href="www.pinterest.com" onTap={({ event }) => event.stopPropagation()}>
            <Box color="secondary" height="100%">
              <Text align="center">Child height only</Text>
            </Box>
          </TapAreaLink>
        </Box>
      </Flex>
    </Box>
  );
}
