import { property, queryAssignedElements } from 'lit/decorators.js';
import { StudsButtonGroup } from './button-group';
import { StudsToggleButton } from './toggle-button';
import { studsElement } from '../../decorators/studs-element';
import { watch } from '../../directives/watch';

/**
 * @element studs-toggle-button-group
 *
 * @slot - The default slot for the ToggleButtonGroup's content
 */
@studsElement('studs-toggle-button-group')
export class StudsToggleButtonGroup extends StudsButtonGroup {
  /**
   * Whether the toggle button group is multi or not
   */
  @property({ type: Boolean }) public multi: boolean = false;
  @queryAssignedElements() private items!: StudsToggleButton[];

  public onClick(event: MouseEvent) {
    if (event.target instanceof StudsToggleButton) {
      if (this.multi) {
        event.target.toggleSelected();
      } else {
        const isSelected = event.target.selected;
        this.items.forEach(item => {
          if (item.selected) item.toggleSelected();
        });
        if (!isSelected) {
          event.target.toggleSelected();
        }
      }
    }
  }

  @watch('multi') onMultiChange() {
    this.updateComplete.then(() => {
      if (this.multi) {
        // this.group?.setAttribute('aria-multiselectable', 'true');
      } else {
        // this.group?.removeAttribute('aria-multiselectable');
      }
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.onClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.onClick);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-toggle-button-group': StudsToggleButtonGroup;
  }
}
