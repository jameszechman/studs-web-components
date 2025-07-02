import style from '@studs/styles/components/tooltips';
import { CSSResult, CSSResultGroup, html, LitElement } from 'lit';
import { studsElement } from '../../decorators/studs-element';
import { classMap } from 'lit/directives/class-map.js';
import { PopperElement } from '../../mixins/popperElement.ts';
import { StudsElement } from '../../mixins/studsElement.ts';

/**
 * @element studs-tooltip
 *
 * @slot - The default slot for tooltip content
 */
@studsElement('studs-tooltip')
export class StudsTooltip extends PopperElement(StudsElement(LitElement)) {
  static styles: CSSResultGroup = [super.styles as CSSResult, style as CSSResult];

  constructor() {
    super();
    this.strategy = 'fixed';
    this.useAvailableWidth = true;
  }

  render() {
    return html`
      <div
        ?disabled=${this.disabled}
        class=${classMap({
          tooltip: true,
          popper: true,
          '-wrapper': true
        })}
        role="tooltip"
      >
        <slot></slot>
        <div id="arrow"></div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-tooltip': StudsTooltip;
  }
}