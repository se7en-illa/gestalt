// @flow strict
import {  Accordion, Text} from 'gestalt';

export default function Test() {
  return (
    <Accordion badgeText="Try it out!" id="ModuleExample - badge" title="Title">
      <Text size="200">This is example content.</Text>
    </Accordion>
  );
}
