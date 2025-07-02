import StudsAccordion from '@studs/react/src/components/StudsAccordion';
import { StudsAccordion as StudsAccordionClass } from '@studs/ui';

interface StudsAccordionReactProps extends StudsAccordionClass {
  /**
   * Enable the header
   */
  enableHeader: boolean;
  /**
   * Enable the search
   */
  enableSearch: boolean;
  /**
   * Size of the accordion
   */
  size: 'small' | 'medium' | 'large';
  /**
   * Variant of the accordion
   */
  variant: 'border' | 'borderless';
  /**
   * Direction of the accordion
   */
  direction: 'start' | 'end';
  /**
   * Disable the accordion
   */
  disabled: boolean;
  /**
   * Open all accordions by default
   */
  defaultOpen: boolean;
}

const StudsAccordionReact = ({
  enableHeader = false,
  enableSearch = false,
  size = 'medium',
  variant = 'borderless',
  direction = 'end',
  disabled = false,
  defaultOpen = false,
}: StudsAccordionReactProps) => {
  // props.
  return <StudsAccordion />;
};

export default StudsAccordionReact;
