import style from '@studs/styles/components/modals';
import { CSSResult, html, LitElement } from 'lit';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';
import { DialogElement } from '../../mixins/dialogElement.ts';

/**
 * @element studs-modal
 *
 * @slot toggle - The default slot for modal toggle content
 * @slot header - The default slot for modal header content
 * @slot - The default slot for modal content
 * @slot footer - The default slot for modal footer content
 */
@studsElement('studs-modal')
export class StudsModal extends StudsElement(DialogElement(LitElement)) {
  static styles = style as CSSResult;

  constructor() {
    super();
    this.type = 'modal';
  }
  render() {
    return html`
      <slot name="toggle" @click=${this.toggle}></slot>
      <dialog class='modal'>
          <div
            class="modal -container"
          >
            <header>
              <slot name="header"></slot>
              <studs-button
                aria-label="Close modal"
                button-type="close"
                @click=${this.onClose}
                autofocus
                icon="close"
              ></studs-button>
            </header>
            <main>
              <slot></slot>
            </main>
            <footer>
              <slot name="footer"></slot>
            </footer>
          </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-modal': StudsModal;
  }
}