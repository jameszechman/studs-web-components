import style from '@studs/styles/components/buttonGroup';
import { CSSResult, html, LitElement } from 'lit';
import { studsElement } from '../../decorators/studs-element';
import { classMap } from 'lit/directives/class-map.js';
import { StudsElement } from '../../mixins/studsElement.ts';
import { createContext, provide } from '@lit/context';


export const buttonGroupContext = createContext('buttonGroup');

/**
 * @element studs-button-group
 *
 * @slot - The default Slot for studs-buttons
 */
@studsElement('studs-button-group')
export class StudsButtonGroup extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  @provide({context: buttonGroupContext}) isButtonGroup = true;

  render() {
    const classes = {
      buttonGroup: true
    };
    return html`
      <div class=${classMap(classes)} role="group" aria-label="Button group">
        <slot></slot>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-button-group': StudsButtonGroup;
  }
}