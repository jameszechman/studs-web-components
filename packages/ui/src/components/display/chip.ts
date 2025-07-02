import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import style from '@studs/styles/components/chip';
import { Icon, IconController } from '../../controllers/iconController';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

export interface ChipProps {
  icon?: Icon;
  iconPosition?: 'start' | 'end';
  size: 'small' | 'medium' | 'large';
  variant: 'primary' | 'secondary' | 'infor';
  contentDirection: 'inline' | 'block';
  disabled: boolean;
  selected: boolean;
  clickable: boolean;
  deletable: boolean;
  children?: TemplateResult | HTMLElement | string;
}

/**
 * @element studs-chip
 *
 * @slot accessory - Renders the accessory content of the Chip
 * @slot - The default slot for the Chip's content
 */
@studsElement('studs-chip')
export class StudsChip extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * The icon to display in the Chip
   */
  @property({ type: String }) icon?: ChipProps['icon'];
  /**
   * The position of the icon
   */
  @property({ type: String }) iconPosition?: ChipProps['iconPosition'];
  /**
   * The size of the Chip
   */
  @property({ type: String }) size: ChipProps['size'] = 'medium';
  /**
   * The variant of the Chip
   */
  @property({ type: String }) variant: ChipProps['variant'] = 'primary';
  /**
   * The direction of the content
   */
  @property({ type: String }) contentDirection: ChipProps['contentDirection'] =
    'inline';
  /**
   * Whether the Chip is disabled or not
   */
  @property({ type: Boolean }) disabled: ChipProps['disabled'] = false;
  /**
   * Whether the Chip is selected or not
   */
  @property({ type: Boolean }) selected: ChipProps['selected'] = false;
  /**
   * Whether the Chip is clickable or not
   */
  @property({ type: Boolean }) clickable: ChipProps['clickable'] = false;
  /**
   * Whether the Chip is deletable or not
   */
  @property({ type: Boolean }) deletable: ChipProps['deletable'] = false;
  private iconController = new IconController(this);

  render() {
    const classes = {
      chip: true,
      [`-${this.size}`]: this.size,
      [`-${this.contentDirection}`]: this.contentDirection,
      [`-${this.variant}`]: this.variant,
      '-reverse': this.iconPosition === 'start',
      '-selected': this.selected,
      '-clickable': this.clickable,
      '-deletable': this.deletable
    };

    return html`
      <div
        part="base"
        class="${classMap(classes)}"
        ?disabled=${this.disabled}
        tabindex=${this.clickable ? '0' : '-1'}
        aria-selected=${this.selected ? 'true' : 'false'}
      >
        <slot name="accessory"></slot>
        ${this.renderIcon()}
        <span class="text"><slot></slot></span>
        ${this.renderDeleteButton()}
      </div>
    `;
  }

  private renderDeleteButton() {
    if (this.deletable) {
      return html`
        <studs-button
          size="small"
          button-type="close"
          icon="close"
          @click=${this.onDelete}
          aria-label="Delete chip"
        ></studs-button>`;
    }
  }

  private renderIcon() {
    if (this.icon)
      return this.iconController.icon(this.icon, {
        size: this.size,
        color: 'inherit'
      });
  }

  private onDelete(event: MouseEvent) {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('delete', {
      bubbles: false,
      composed: false
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-chip': StudsChip;
  }
}