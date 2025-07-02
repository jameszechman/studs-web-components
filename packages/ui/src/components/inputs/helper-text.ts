import { CSSResult, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import style from '@studs/styles/components/helperText';
import { ifDefined } from 'lit/directives/if-defined.js';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

/**
 * @element studs-helper-text
 *
 * @slot - The default slot for helper text content
 */
@studsElement('studs-helper-text')
export class StudsHelperText extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * The status of the helper text
   */
  @property({ type: String }) status?: 'error' | 'success' | 'warning';

  render() {
    return html`
      <p class=${ifDefined(this.status)}>
        <slot></slot>
      </p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-helper-text': StudsHelperText;
  }
}