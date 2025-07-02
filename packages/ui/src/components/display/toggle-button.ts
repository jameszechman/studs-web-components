import { property } from 'lit/decorators.js';
import { StudsButton } from './button';
import { studsElement } from '../../decorators/studs-element';
import { watch } from '../../directives/watch';

/**
 * @element studs-toggle-button
 *
 * @slot media - The slot for media elements, used with button-type="image"
 * @slot - The default slot for the ToggleButton's content
 */
@studsElement('studs-toggle-button')
export class StudsToggleButton extends StudsButton {
  /**
   * Whether the toggle button is selected or not
   */
  @property({ type: Boolean, reflect: true }) selected: boolean = false;

  @watch('selected', {
    waitUntilFirstUpdate: true
  })
  onSelectedChange() {
    this.setAttribute('aria-pressed', JSON.stringify(this.selected));
    this.dispatchEvent(new CustomEvent('toggle-selected', {
      bubbles: true,
      composed: true,
      detail: { selected: this.selected }
    }));
    this.updateComplete.then(() => {
      const button = this.shadowRoot?.querySelector('button');
      button?.classList.toggle('-active');
    });
  }

  public toggleSelected(): void {
    this.selected = !this.selected;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.selected) {
      this.updateComplete.then(() => {
        const button = this.shadowRoot?.querySelector('button');
        button?.classList.add('-active');
      });
    }
    this.setAttribute('aria-pressed', 'false');
    if (this.parentElement && this.parentElement.localName !== 'studs-toggle-button-group') this.addEventListener('click', this.toggleSelected);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.parentElement && this.parentElement.localName !== 'studs-toggle-button-group') this.removeEventListener('click', this.toggleSelected);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-toggle-button': StudsToggleButton;
  }
}