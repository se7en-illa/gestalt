import { BaseStackType } from './constants';
import HoverOverlay from './HoverOverlay';
import PositioningWrapper from './PositioningWrapper';
import Avatar from '../Avatar';

type Props = BaseStackType & {
  avatarColorIndex?: string;
  index: number;
  name: string;
  isFocused: boolean;
  isFocusVisible: boolean;
  isHovered: boolean;
  isPressed: boolean;
  src: string;
};

export default function AvatarGroupCollaboratorAvatar({
  avatarColorIndex,
  isHovered,
  index,
  isFocused,
  isFocusVisible,
  name,
  pileCount,
  isPressed,
  size,
  src,
}: Props) {
  return (
    <PositioningWrapper index={index} pileCount={pileCount} size={size}>
      <HoverOverlay hovered={isHovered} size={size}>
        <Avatar avatarColorIndex={avatarColorIndex} isFocused={isFocused} isFocusVisible={isFocusVisible} isHovered={isHovered} isPressed={isPressed} name={name} outline size={size} src={src} />
      </HoverOverlay>
    </PositioningWrapper>
  );
}
