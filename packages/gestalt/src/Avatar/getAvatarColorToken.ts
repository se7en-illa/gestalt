import { TOKEN_COLOR_BORDER_AVATAR } from 'gestalt-design-tokens';

interface ColorToken {
  base: string;
  hover: string;
  pressed: string;
}

interface ColorTokens {
  [key: string]: ColorToken;
}

// Need to replace color tokens
const colorTokens: ColorTokens = {
  default: {
    base: TOKEN_COLOR_BORDER_AVATAR,
    hover: TOKEN_COLOR_BORDER_AVATAR,
    pressed: TOKEN_COLOR_BORDER_AVATAR,
  },
  "01": { // redWeak
    base: '#FFD3D1',
    hover: '#FFD3D1',
    pressed: '#FFD3D1'
  },
  "02": { // redDefault
    base: '#FF9494',
    hover: '#FF9494',
    pressed: '#FF9494'
  },
  "03": { // purpleWeak
    base: '#FCD8FC',
    hover: '#FCD8FC',
    pressed: '#FCD8FC'
  },
  "04": { // purpleDefault
    base: '#EFADEF',
    hover: '#EFADEF',
    pressed: '#EFADEF'
  },
  "05": { // blueWeak
    base: '#C5EAF7',
    hover: '#C5EAF7',
    pressed: '#C5EAF7'
  },
  "06": { // blueDefault
    base: '#7CBEDE',
    hover: '#7CBEDE',
    pressed: '#7CBEDE'
  },
  "07": { // greenWeak
    base: '#D0E2A8',
    hover: '#D0E2A8',
    pressed: '#D0E2A8'
  },
  "08": { // greenDefault
    base: '#A8BB63',
    hover: '#A8BB63',
    pressed: '#A8BB63'
  },
  "09": { // orangeWeak
    base: '#FDE7C9',
    hover: '#FDE7C9',
    pressed: '#FDE7C9'
  },
  "10": { // orangeDefault
    base: '#FBC55B',
    hover: '#FBC55B',
    pressed: '#FBC55B'
  },
}

type BackgroundColor = keyof typeof colorTokens;
type GetAvatarColorToken = (avatarColorIndex: BackgroundColor, isHovered?: boolean, isPressed?: boolean) => string;

const getAvatarColorToken: GetAvatarColorToken = (avatarColorIndex, isHovered, isPressed) => {
  const colorToken = colorTokens[avatarColorIndex];

  if (!colorToken || !avatarColorIndex) {
    throw new Error(`Invalid background color: ${avatarColorIndex}`);
  }

  if (isPressed) {
    return colorToken.pressed;
  }

  if (isHovered) {
    return colorToken.hover;
  }

  return colorToken.base;
}

export default getAvatarColorToken;
