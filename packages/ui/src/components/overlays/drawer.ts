import style from '@studs/styles/components/drawer';
import { studsElement } from '../../decorators/studs-element.ts';
import { CSSResult, html, LitElement } from 'lit';
import { StudsElement } from '../../mixins/studsElement.ts';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { watch } from '../../directives/watch.ts';

/**
 * @element studs-drawer
 *
 * @slot - The default slot for drawer content
 */
@studsElement('studs-drawer')
export class StudsDrawer extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * The position of the drawer
   */
  @property({type: String}) position: 'top' | 'right' | 'bottom' | 'left' = 'right';
  /**
   * The Size of the drawer
   */
  @property({type: String}) size: 'small' | 'medium' | 'large' | 'full' = 'medium';
  /**
   * Whether the drawer is open
   */
  @property({type: Boolean}) open = false;
  /**
   * Whether the drawer should close on ESC key press
   */
  @property({type: Boolean, attribute: 'close-on-esc'}) closeOnEsc = true;
  @query('aside') asideElement: HTMLElement;
  @state() private isOpen = false;
  @state() private isClosing: boolean = false;

  private _keydownEventAdded: boolean = false;

  @watch('closeOnEsc')
  handleCloseOnEsc() {
    if(this.closeOnEsc && !this._keydownEventAdded) {
      document.addEventListener('keydown', this.handleKeyDown);
      this._keydownEventAdded = true;
    } else if(!this.closeOnEsc && this._keydownEventAdded) {
      document.removeEventListener('keydown', this.handleKeyDown);
      this._keydownEventAdded = false;
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if(this.closeOnEsc) {
      document.removeEventListener('keydown', this.handleKeyDown);
      this._keydownEventAdded = false;
    }
  }

  render() {
    return html`
      <slot name="toggle" @click=${this.toggle}></slot>
      <aside
        aria-hidden=${!this.isOpen}
        class=${classMap({
        drawer: true,
        [`-${this.position}`]: true,
        [`-${this.size}`]: true,
          closing: this.isClosing
      })}
        @animationend=${() => {
          if(!this.open) {
            this.isOpen = false;
            this.isClosing = false;
          }
        }}
      ><slot></slot></aside>
    `
  }
  @watch('open', {waitUntilFirstUpdate: true})
  handleOpenEvent() {
    if(this.open) this.isOpen = true;
    else this.isClosing = true;
    this.dispatchEvent(new CustomEvent('on-toggle', {detail: this.open}));
  }
  private toggle() {
    this.open = !this.open;
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if(this.open && event.key === 'Escape') {
      this.open = false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-drawer': StudsDrawer;
  }
}