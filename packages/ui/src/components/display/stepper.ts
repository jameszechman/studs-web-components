import { CSSResult, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';
import style from '@studs/styles/components/stepper';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

interface Step {
  id?: string;
  label: string;
  description?: string;
}

/**
 * @element studs-stepper
 *
 */
@studsElement('studs-stepper')
export class StudsStepper extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * The steps of the stepper
   */
  @property({ type: Array }) steps: Step[] = [];
  /**
   * The current step of the stepper
   */
  @property({ type: Number }) step: number = 0;
  /**
   * The direction of the stepper
   */
  @property({ type: String }) direction: 'inline' | 'block' =
    'inline';
  /**
   * The color of the stepper
   */
  @property({ type: String }) color: 'primary' | 'secondary' | 'initial' = 'initial';
  /**
   * The size of the icons
   */
  @property({ type: String }) stepSize: 'medium' | 'small' | 'extraSmall' = 'medium';

  render() {
    const classes = {
      stepper: true,
      [`-${this.direction}`]: true,
      [`-${this.color}`]: true,
      [`-${this.stepSize}`]: true
    };

    return html`
      <div
        class=${classMap(classes)}
        role="progressbar"
        aria-orientation="${this.direction}"
        aria-valuemin="0"
        aria-valuemax="${this.steps.length}"
        aria-valuenow="${this.step}"
        aria-label="Progress: Step ${this.step + 1} of ${this.steps.length}"
      >
        ${map(this.steps, (step, index) => {
          const classes = {
            step: true,
            '-wrapper': true,
            '-active': index === this.step,
            '-complete': index < this.step
          };

          return html`
            <div class=${classMap(classes)}>
              <div class="step -number">${this.renderNumber(index)}</div>
              <div class="step -container">
                <div class="step -label"><p>${step.label}</p></div>
                ${step.description
                  ? html`
                    <div class="step -description">${step.description}</div>`
                  : ''}
              </div>
            </div>`;
        })}
      </div>
    `;
  }

  private renderNumber(index: number) {
    if (index < this.step) {
      return html`<i class="icon">check</i>`;
    } else {
      return html`<span class="stepNumber">${index + 1}</span>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-stepper': StudsStepper;
  }
}