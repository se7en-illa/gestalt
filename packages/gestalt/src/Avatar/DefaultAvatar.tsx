import AvatarFoundation from './Foundation';

type Props = {
  accessibilityLabel?: string;
  avatarColorIndex?: string;
  isFocused?: boolean;
  isFocusVisible?: boolean;
  isHovered?: boolean;
  isPressed?: boolean;
  name: string;
};

export default function DefaultAvatar({ accessibilityLabel, avatarColorIndex, isFocused, isFocusVisible, isHovered, isPressed, name }: Props) {
  const firstInitial = name ? Array.from(name)[0].toUpperCase() : '';
  const title = accessibilityLabel ?? name;

  return (
    <AvatarFoundation
      avatarColorIndex={avatarColorIndex}
      fontSize="40px"
      isFocused={isFocused}
      isFocusVisible={isFocusVisible}
      isHovered={isHovered}
      isPressed={isPressed}
      textAnchor="middle"
      title={title}
    >
      {firstInitial}
    </AvatarFoundation>
  );
}
