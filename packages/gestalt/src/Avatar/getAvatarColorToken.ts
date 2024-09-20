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
  "01": { // redWeak
    base: '#FFD3D1',
    hover: '#FBBEBB',
    pressed: '#F4A8A4'
  },
  "02": { // redDefault
    base: '#FF9494',
    hover: '#F87777',
    pressed: '#ED5A5A'
  },
  "03": { // purpleWeak
    base: '#FCD8FC',
    hover: '#FAC7FA',
    pressed: '#F8B5F8'
  },
  "04": { // purpleDefault
    base: '#EFADEF',
    hover: '#E599E5',
    pressed: '#DA86DA'
  },
  "05": { // blueWeak
    base: '#C5EAF7',
    hover: '#A8DDF0',
    pressed: '#8ECFE6'
  },
  "06": { // blueDefault
    base: '#7CBEDE',
    hover: '#58A9D0',
    pressed: '#4096BF'
  },
  "07": { // greenWeak
    base: '#D0E2A8',
    hover: '#BCD090',
    pressed: '#A7B97E'
  },
  "08": { // greenDefault
    base: '#A8BB63',
    hover: '#93A550',
    pressed: '#81904C'
  },
  "09": { // orangeWeak
    base: '#FDE7C9',
    hover: '#F9D9AE',
    pressed: '#F4CC95'
  },
  "10": { // orangeDefault
    base: '#FBC55B',
    hover: '#F8B430',
    pressed: '#F1A613'
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
