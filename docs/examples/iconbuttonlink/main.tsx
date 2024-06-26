import { Flex, IconButtonLink } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <IconButtonLink
        accessibilityLabel=""
        href="#"
        icon="visit"
        onClick={({ event, dangerouslyDisableOnNavigation }) => {
          event.preventDefault();
          dangerouslyDisableOnNavigation();
        }}
        target="blank"
        tooltip={{ text: 'Besuchen Sie Pinterest' }}
      />
    </Flex>
  );
}
