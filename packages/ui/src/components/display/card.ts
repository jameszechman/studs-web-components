import { CSSResult, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import style from '@studs/styles/components/card';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

/**
 * @element studs-card
 *
 * @slot main - The default slot for the Card's main content
 * @slot footer - The default slot for the Card's footer content
 */

@studsElement('studs-card')
export class StudsCard extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * The type of card to render
   */
  @property({ type: String })
  type: 'horizontal' | 'vertical' | 'compact' = 'vertical';
  /**
   * The placement of the media in the card
   */
  @property({ type: String })
  placement: 'left' | 'right' | 'top' | 'middle' | 'none' = 'top';

  render() {
    const classes = {
      card: true,
      [`-${this.type}`]: true,
      [`-${this.placement}`]: this.placement,
    };

    return html`
      <article class="${classMap(classes)}">
        ${this.type !== 'compact' && this.placement !== 'none'
          ? html`<slot name="media" class="media"></slot>`
          : ''}
        <slot name="title" class="title"></slot>
        <slot name="content" class="content"></slot>
        <slot name="footer" class="footer"></slot>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-card': StudsCard;
  }
}
