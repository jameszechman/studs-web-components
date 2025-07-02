import style from '@studs/styles/components/spinner';
import { CSSResult, html, LitElement, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { getDocumentElement } from '../../utils/shared';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

export interface SpinnerProps {
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  disableBackdrop?: boolean;
  color?: 'inherit' | 'primary' | 'secondary' | 'tertiary';
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  open?: boolean;
  toggleOpen?: () => void;
}

/**
 * @element studs-spinner
 *
 */
@studsElement('studs-spinner')
export class StudsSpinner extends StudsElement(LitElement) {
  static styles = [style as CSSResult];
  /**
   * Whether the spinner should close when the overlay is clicked
   */
  @property({ type: Boolean, attribute: 'close-on-overlay-click' })
  closeOnOverlayClick: SpinnerProps['closeOnOverlayClick'] = false;
  /**
   * Whether the spinner should close when escape is pressed
   */
  @property({ type: Boolean, attribute: 'close-on-escape' })
  closeOnEscape: SpinnerProps['closeOnEscape'] = false;
  /**
   * Whether the spinner should disable the backdrop
   */
  @property({ type: Boolean, attribute: 'disable-backdrop' })
  disableBackdrop: SpinnerProps['disableBackdrop'] = false;
  /**
   * The color of the spinner
   */
  @property({ type: String }) color: SpinnerProps['color'] = 'primary';
    /**
   * The size of the spinner
   */
  @property({ type: String }) size: SpinnerProps['size'] = 'medium';
  /**
   * Whether the spinner is open or not
   */
  @property({ type: Boolean }) open: boolean = false;

  connectedCallback(): void {
    super.connectedCallback();
    if (this.closeOnEscape)
      getDocumentElement(this).addEventListener('keydown', this.onEscapeClose);
  }

  public toggleOpen(): void {
    this.open = !this.open;
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.updated(_changedProperties);
    if (_changedProperties.has('closeOnEscape')) {
      if (this.closeOnEscape)
        getDocumentElement(this).addEventListener(
          'keydown',
          this.onEscapeClose
        );
      else
        getDocumentElement(this).removeEventListener(
          'keydown',
          this.onEscapeClose
        );
    }
  }

  protected render(): unknown {
    return html`
      <div
        class=${classMap({
          spinner: true,
          '-show': true
        })}
        aria-hidden=${!this.open}
        role="progressbar"
        aria-busy=${this.open ? 'true' : 'false'}
        aria-label="Loading"
      >
        <div
          class="-overlay"
          ?disabled=${this.disableBackdrop}
          @click=${this.closeOnOverlayClick ? this.onOverlayClose : null}
        >
          <div
            class=${classMap({
              'loader -spinner': true,
              [`-${this.color}`]: true,
              '-extraSmall': this.size === 'extraSmall',
              '-small': this.size === 'small',
              '-medium': this.size === 'medium',
              '-large': this.size === 'large',
            })}
          ></div>
        </div>
      </div>`;
  }

  private onOverlayClose(event: any) {
    if (event.target?.classList?.contains('-overlay')) {
      this.toggleOpen();
    }
  }

  private onEscapeClose = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.open = false;
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-spinner': StudsSpinner;
  }
}