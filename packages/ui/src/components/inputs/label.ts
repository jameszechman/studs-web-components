import { CSSResult, LitElement, nothing, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import style from '@studs/styles/components/label';
import { IconController } from '../../controllers/iconController';
import { studsElement } from '../../decorators/studs-element';
import { html, literal } from 'lit/static-html.js';
import { watch } from '../../directives/watch';
import { StudsElement } from '../../mixins/studsElement.ts';

/**
 * @element studs-label
 *
 * @slot - The default slot for label content
 *
 */
@studsElement('studs-label')
export class StudsLabel extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * The type of label to render
   */
  @property({ type: String }) as: 'label' | 'legend' = 'label';
  /**
   * Whether or not the label is required
   */
  @property({ type: Boolean }) required: boolean = false;
  /**
   * Whether or not the label is optional
   */
  @property({ type: Boolean }) optional: boolean = false;
  /**
   * The tooltip text to display
   */
  @property({ type: String }) tooltip?: string;
  private tag = literal`label`;
  private iconController = new IconController(this);

  @watch('as')
  updateTag() {
    switch (this.as) {
      case 'legend':
        this.tag = literal`legend`;
        break;
      default:
        this.tag = literal`label`;
        break;
    }
  }

  @watch('required')
  @watch('optional')
  onRequirementsChange() {
    if (this.required && this.optional) {
      console.warn('Label cannot be both required and optional. Defaulting to required.');
      this.optional = false;
    }
  }

  render(): TemplateResult {
    return html`
      <${this.tag}>
        <slot></slot>
        ${this.required ? html`<span class="required">*</span>` : nothing}
        ${this.optional ? html`<span class="optional">(optional)</span>` : nothing}
        ${this.tooltip ? html`
          <div class="tooltip">${this.iconController.icon('info', {
            size: 'small'
          })}
            <studs-tooltip position='right'>${this.tooltip}</studs-tooltip>
          </div>` : nothing}
      </${this.tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-label': StudsLabel;
  }
}