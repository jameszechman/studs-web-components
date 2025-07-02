import { CSSResult, LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import style from '@studs/styles/components/progress';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

/**
 * @element studs-progress
 */
@studsElement('studs-progress')
export class StudsProgress extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * The current value of the progress bar
   */
  @property({ type: Number }) value = 0;
  /**
   * The maximum value of the progress bar
   */
  @property({ type: Number }) max = 100;
  /**
   * Whether to show the value of the progress bar
   */
  @property({ type: Boolean, attribute: 'show-value' }) showValue = false;
  /**
   * The size of the progress bar. Can be 'small', 'medium', or 'large'
   */
  @property({ type: String, attribute: 'size' }) size: 'small' | 'medium' | 'large' = 'medium';
  /**
   * The label for the progress bar
   */
  @property({ type: String }) label = '';
  /**
   * Helper text for the progress bar
   */
  @property({ type: String, attribute: 'helper-text' }) helperText = '';
  /**
   * Whether the progress bar is in indeterminate state
   */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  render() {
    const classes = {
      progress: true,
      '-small': this.size === 'small',
      '-medium': this.size === 'medium',
      '-large': this.size === 'large',
      indeterminate: this.indeterminate,
    };

    return html`
      <div class=${classMap(classes)}>
        ${this.label ? html`<span class="label">${this.label}</span>` : null}
        <div class="progress-container">
          ${this.indeterminate
            ? html`<progress role="progressbar" max="${this.max}"></progress>`
            : html`<progress role="progressbar" max="${this.max}" value="${this.value}"></progress>
                ${this.showValue ? html`<span>${this.value}%</span>` : null}`}
        </div>
        ${this.helperText
          ? html`<span class="helper-text">${this.helperText}</span>`
          : null}
      </div>
    `;
  }
}
