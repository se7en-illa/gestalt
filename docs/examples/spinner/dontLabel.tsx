import { Flex, Spinner, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={2}>
        <Spinner accessibilityLabel="Example spinner" show />

        <Text weight="bold">Loading…</Text>
      </Flex>
    </Flex>
  );
}
