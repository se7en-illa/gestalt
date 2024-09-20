import { ReactNode } from 'react';
import classnames from 'classnames';
import { TOKEN_COLOR_TEXT_DEFAULT } from 'gestalt-design-tokens';
import foundationStyles from './AvatarFoundation.css';
import getAvatarColorToken from './getAvatarColorToken';
import avatarStyles from '../AvatarGroup.css';
import styles from '../Icon.css';
import icons from '../icons/index';
import vrIcons from '../icons-vr-theme/index';
import TextUI from '../TextUI';
import typographyStyle from '../Typography.css';
import useFocusVisible from '../useFocusVisible';
import useInExperiment from '../useInExperiment';
import useInteractiveStates from '../utils/useInteractiveStates';

const ICON_SIZE_RATIO = (20 / 48) * 100; // For pixel perfect icon button, we use the icon (20px) to parent container (48px) size ratio

type ResponsiveFitSizeBoxProps = {
  avatarColorIndex?: string;
  children: ReactNode;
  isFocused?: boolean;
  isFocusVisible?: boolean;
  isHovered?: boolean;
  isPressed?: boolean;
  outline: boolean;
};

function ResponsiveFitSizeBox({
  avatarColorIndex,
  children,
  isFocused: avatarGroupFocus,
  isFocusVisible: avatarGroupFocusVisible,
  isHovered: avatarGroupHovered,
  isPressed: avatarGroupPressed,
  outline,
}: ResponsiveFitSizeBoxProps) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const {
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnBlur,
    handleOnFocus,
    handleOnMouseDown,
    handleOnMouseUp,
    isFocused: defaultIsFocused,
    isHovered: defaultIsHovered,
    isActive: defaultIsPressed,
  } = useInteractiveStates();

  const { isFocusVisible } = useFocusVisible();
  const isFocused = avatarGroupFocus || defaultIsFocused;
  const isHovered = avatarGroupHovered || defaultIsHovered;
  const isPressed = avatarGroupPressed || defaultIsPressed;

  console.log("avatarGroupHovered", avatarGroupHovered);
  console.log("defaultIsHovered", defaultIsHovered);

  const avatarBackgroundColor = getAvatarColorToken(avatarColorIndex || "06", isHovered, isPressed);

  return (
    <div
      className={classnames('container', {
        [foundationStyles.container]: true,
        [foundationStyles.outline]: outline && !isInVRExperiment,
        [foundationStyles['outline-VR']]: outline && isInVRExperiment,
        [foundationStyles.focused]: isInVRExperiment && isFocused && isFocusVisible,
      })}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      onMouseDown={handleOnMouseDown}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onMouseUp={handleOnMouseUp}
           role="button"
      style={{
        backgroundColor: isInVRExperiment ? avatarBackgroundColor : "06",
      }}
      tabIndex={0}
    >
      <div className={foundationStyles.innerDiv}>{children}</div>
    </div>
  );
}


type AvatarFoundationProps = {
  avatarColorIndex?: string;
  children?: string | number;
  isFocused?: boolean;
  isFocusVisible?: boolean;
  isHovered?: boolean;
  isPressed?: boolean;
  fontSize?: string;
  outline?: boolean;
  textAnchor?: 'start' | 'middle' | 'end';
  title?: string;
  translate?: 'translateX10';
  content?: 'text' | 'icon';
};

export default function AvatarFoundation({
  avatarColorIndex,
  children,
  fontSize,
  isFocused,
  isFocusVisible,
  isHovered,
  isPressed,
  outline = false,
  textAnchor = 'middle',
  title,
  translate,
  content = 'text',
}: AvatarFoundationProps) {
  const cs = classnames(styles.icon, avatarStyles.text);

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return (
    <ResponsiveFitSizeBox
      avatarColorIndex={avatarColorIndex}
      isFocused={isFocused}
      isFocusVisible={isFocusVisible}
      isHovered={isHovered}
      isPressed={isPressed}
      outline={outline}
    >
      {content === 'text' ? (
        <svg
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          viewBox="-50 -50 100 100"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          {title ? <title>{title}</title> : null}
          {isInVRExperiment ? (
            // <TextUI align="center" size="lg">
            //   {children}
            // </TextUI>
            <text
              className={[
                typographyStyle.antialiased,
                typographyStyle.sansSerif,
                typographyStyle.fontWeightSemiBold,
                translate && avatarStyles[translate], // if addCollaborator button is present, translateX moves numbers closer to the edge
              ].join(' ')}
              dy="0.35em"
              fill={TOKEN_COLOR_TEXT_DEFAULT}
              fontSize={fontSize}
              textAnchor={textAnchor}
            >
              {children}
            </text>
          ) : (
            <text
              className={[
                typographyStyle.antialiased,
                typographyStyle.sansSerif,
                typographyStyle.fontWeightSemiBold,
                translate && avatarStyles[translate], // if addCollaborator button is present, translateX moves numbers closer to the edge
              ].join(' ')}
              dy="0.35em"
              fill={TOKEN_COLOR_TEXT_DEFAULT}
              fontSize={fontSize}
              textAnchor={textAnchor}
            >
              {children}
            </text>
          )}
        </svg>
      ) : null}
      {content === 'icon' ? (
        <svg
          className={cs}
          preserveAspectRatio="xMidYMid meet" // percentual width to the parent container, reduces icon to 20px on a 48px parent container and keeps proportions upon resizing
          role="img" // full icon size
          version="1.1"
          viewBox="0 0 24 24"
          width={`${ICON_SIZE_RATIO}%`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Icon</title>
          <path d={(isInVRExperiment ? vrIcons : icons)['person-add']} />
        </svg>
      ) : null}
    </ResponsiveFitSizeBox>
  );
}
