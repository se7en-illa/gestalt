import { ReactNode } from 'react';
import classnames from 'classnames';
import { TOKEN_COLOR_TEXT_DEFAULT } from 'gestalt-design-tokens';
import foundationStyles from './AvatarFoundation.css';
import getAvatarColorToken from './getAvatarColorToken';
import avatarStyles from '../AvatarGroup.css';
import styles from '../Icon.css';
import icons from '../icons/index';
import vrIcons from '../icons-vr-theme/index';
import typographyStyle from '../Typography.css';
import useInExperiment from '../useInExperiment';
import TextUI from '../'

const ICON_SIZE_RATIO = (20 / 48) * 100; // For pixel perfect icon button, we use the icon (20px) to parent container (48px) size ratio

type ResponsiveFitSizeBoxProps = {
  avatarColorIndex?: string;
  children: ReactNode;
  outline: boolean;
};

function ResponsiveFitSizeBox({ avatarColorIndex, children, outline }: ResponsiveFitSizeBoxProps) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const avatarBackgroundColor = getAvatarColorToken(avatarColorIndex || '06');

  return (
    <div
      className={classnames({
        [foundationStyles.container]: true,
        [foundationStyles.outline]: outline && !isInVRExperiment,
        [foundationStyles['outline-VR']] : outline && isInVRExperiment,
      })}
      style={{
        backgroundColor: isInVRExperiment ? avatarBackgroundColor : 'white',
      }}
    >
      <div className={foundationStyles.innerDiv}>
        {children}
      </div>
    </div>
  );
}

type Props = {
  avatarColorIndex?: string;
  children?: string | number;
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
  outline = false,
  textAnchor = 'middle',
  title,
  translate,
  content = 'text',
}: Props) {

  const cs = classnames(styles.icon, avatarStyles.text);

  const isInExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return (
    <ResponsiveFitSizeBox avatarColorIndex={avatarColorIndex} outline={outline}>
      {content === 'text' ? (
        <svg
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          viewBox="-50 -50 100 100"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          {title ? <title>{title}</title> : null}
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
          <path d={(isInExperiment ? vrIcons : icons)['person-add']} />
        </svg>
      ) : null}
    </ResponsiveFitSizeBox>
  );
}
