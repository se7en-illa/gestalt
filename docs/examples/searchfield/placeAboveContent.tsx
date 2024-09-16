import { Box, SearchField } from 'gestalt';

export default function Example() {
  return (
    <Box height="100%" padding={4} width="100%">
      <SearchField
        accessibilityClearButtonLabel="Clear search field"
        accessibilityLabel="Search your Pins"
        id="bestPracticesDo1"
        onChange={() => {}}
        placeholder="Search your Pins"
      />
    </Box>
  );
}
