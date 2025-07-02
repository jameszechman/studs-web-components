import style from '@studs/styles/components/buttons';
import { CSSResult, LitElement, nothing, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Icon, IconController } from '../../controllers/iconController';
import { studsElement } from '../../decorators/studs-element';
import { watch } from '../../directives/watch';
import { StudsElement } from '../../mixins/studsElement.ts';
import { consume } from '@lit/context';
import { buttonGroupContext } from './button-group.ts';
import { AnchorElement } from '../../mixins/anchorElement.ts';
import { literal, html } from 'lit/static-html.js';
import { DefaultSizeConverter } from '../../utils/converters.ts';

/**
 * @element studs-button
 *
 * @slot media - The slot for media elements, used with button-type="image"
 * @slot - The default slot for button content
 */

@studsElement('studs-button')
export class StudsButton extends StudsElement(AnchorElement(LitElement)) {
  static styles = style as CSSResult;
  protected static formAssociated = true;
  @consume({context: buttonGroupContext}) private isInButtonGroup = false;
  /**
   * The type of button to render
   */
  @property({ type: String, attribute: 'button-type' })
  buttonType: 'cta'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'link'
    | 'floating'
    | 'icon'
    | 'square'
    | 'circle'
    | 'close'
    | 'image' = 'primary';
  /**
   * The size of the button
   */
  @property({
    type: String,
    converter: DefaultSizeConverter,
  })
  size: 'small' | 'medium' | 'large' = 'medium';
  /**
   * The variant of the button
   */
  @property({ type: String }) variant?: 'outline';
  /**
   * Whether the button is disabled or not
   */
  @property({ type: Boolean }) disabled: boolean = false;
  /**
   * The position of the icon
   */
  @property({ type: String, attribute: 'icon-position' })
  iconPosition: 'start' | 'end' = 'start';
  /**
   * The direction of the content
   */
  @property({ type: String, attribute: 'content-direction' })
  contentDirection: 'inline' | 'block' = 'inline';
  /**
   * The icon to display in the button
   */
  @property({ type: String }) icon?: Icon;
  /**
   * The type of button to render
   */
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';
  /**
   * Whether the button should be full width or not
   */
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth: boolean = false;
  /**
   * The element to render as
   * @default button
   * @type {'button' | 'a' | 'div'}
   * @attr as
   * @example
   * <studs-button as="a">Link</studs-button>
   */
  @property({type: String}) as?: 'button' | 'a' | 'div' = 'button';
  @state() _internals?: ElementInternals;
  get internalsDoNotExist() {
    return (!this._internals || typeof this._internals === 'undefined') && typeof this.attachInternals === 'function'
  }
  private iconController = new IconController(this);
  private tag = literal`button`;

  @watch('as')
  updateTag() {
    switch (this.as) {
      case 'a':
        this.tag = literal`a`;
        break;
      case 'div':
        this.tag = literal`div`;
        break;
      default:
        if(this.internalsDoNotExist) {
          this._internals = this.attachInternals();
        };
        this.tag = literal`button`;
        break;
    }
  }

  @watch('href')
  updateTagHref() {
    if (this.href && this.as !== 'a') {
      this.as = 'a';
    }
  }
  @watch('type')
  updateType() {
    if ((this.type === 'submit' || this.type === 'reset') && this.internalsDoNotExist) {
      this._internals = this.attachInternals();
    }
  }

  render(): TemplateResult {
    const classes = {
      button: true,
      [`-${this.buttonType}`]: this.buttonType,
      [`-${this.size}`]: true,
      '-group': this.isInButtonGroup,
      '-outline': this.variant === 'outline',
      '-block': this.contentDirection === 'block',
      '-reverse': this.iconPosition === 'end',
      '-full': this.fullWidth
    };

    return html`
      <${this.tag}
        part="base"
        class="${classMap(classes)}"
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        type=${ifDefined(this.type)}
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        download=${ifDefined(this.download)}
        hreflang=${ifDefined(this.hreflang)}
        ping=${ifDefined(this.ping)}
        referrerpolicy=${ifDefined(this.referrerpolicy)}
        rel=${ifDefined(this.rel)}
        @click=${this.getClickEvent()}
      >
        <slot name="media" class="image"></slot>
        ${this.renderIcon()}
        <slot></slot>
      </${this.tag}>`;
  }

  public submit() {
    if (this.as === 'button' && this._internals?.form) this._internals.form.requestSubmit();
  }

  public reset() {
    if (this.as === 'button' && this._internals?.form) this._internals.form.reset();
  }

  private renderIcon() {
    const { icon } = this.iconController;
    if (this.icon)
      return icon(this.icon, {
        size: this.size,
        color: 'inherit'
      });
  }

  private getClickEvent() {
    if(this.as === 'button') switch (this.type) {
      case 'submit':
        return this.submit;
      case 'reset':
        return this.reset;
      default:
        return nothing;
    } else return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-button': StudsButton;
  }
}
