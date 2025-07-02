import StudsBadge from '@studs/react/src/components/StudsBadge';
import { StudsBadge as StudsBadgeClass } from '@studs/ui';

interface StudsBadgeReactProps extends StudsBadgeClass {
  /**
   * Define display icon (class) of the button component using html svg or font icon
   */
  icon: string;
  /**
   * Count number
   */
  count: number;
  /**
   * Max number for count
   */
  max: number;
  /**
   * Show count if count = 0
   */
  showZero: boolean;
  /**
   * Size of the Badge
   */
  size: 'small' | 'medium' | 'large';
  /**
   * Position of the Badge
   */
  position:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'center';
  /**
   * The badge's color
   */
  color: string;
  /**
   * Show marker boolean
   */
  marker: boolean;
}

const StudsBadgeReact = ({
  icon,
  count = 0,
  max = 99,
  showZero = false,
  size = 'medium',
  position = 'top-right',
  color = 'primary',
  marker = false,
}: StudsBadgeReactProps) => {
  // props.
  return <StudsBadge />;
};

export default StudsBadgeReact;
