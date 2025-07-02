import style from '@studs/styles/components/divider';
import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

type orientation = 'inline' | 'block';
type align = 'start' | 'center' | 'end';
type size = 'small' | 'medium' | 'large' | 'extraLarge';

/**
 * @element studs-divider
 *
 */

@studsElement('studs-divider')
export class StudsDivider extends StudsElement(LitElement) {
  static override styles = style as CSSResult;

  /**
   * Sets the orientation of the divider
   */
  @property({ type: String }) orientation?: orientation = 'inline';
  /**
   * Aligns the text, if it exists, inside the divider
   */
  @property({ type: String }) align?: align;
  /**
   * Sets the size of the divider
   */
  @property({ type: String }) size?: size = 'small';

  /**
   * Sets the variant of the divider
   */
  @property({type: String}) variant?: 'solid' | 'dashed' = 'solid';

  override render(): TemplateResult<1> {
    return html`
      <div
        class="${classMap({
          divider: true,
          [`-${this.orientation}`]: !!this.orientation,
          [`-${this.size}`]: !!this.size,
          [`-${this.align}`]: !!this.align,
          [`-${this.variant}`]: !!this.variant
        })}"
      >
        ${this.hasChildren()
          ? html`
            <div class="content">
              <slot></slot>
            </div>`
          : nothing}
      </div>
    `;
  }

  private hasChildren() {
    return this.hasChildNodes() && this.childNodes.length > 0;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-divider': StudsDivider;
  }
}