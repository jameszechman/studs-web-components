import styles from '@studs/styles/components/alert-dialog-group';
import { CSSResult, html, LitElement } from 'lit';
import { studsElement } from '../../decorators/studs-element';
import { classMap } from 'lit/directives/class-map.js';
import { StudsElement } from '../../mixins/studsElement.ts';
import { createContext, provide } from '@lit/context';

export const alertDialogGroupContext = createContext('alertDialogGroup');

/**
 * @element studs-alert-dialog-group
 *
 * @slot - The default Slot for studs-alert-dialog
 */

@studsElement('studs-alert-dialog-group')
export class StudsAlertDialogGroup extends StudsElement(LitElement) {
  static styles = styles as CSSResult;
  @provide({ context: alertDialogGroupContext }) isAlertDialogGroup = true;

  render() {
    const classes = {
      'alert-dialog-group': true,
    };
    return html` <div
      class=${classMap(classes)}
      role="group"
      aria-label="Alert Dialog group"
    >
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-alert-dialog-group': StudsAlertDialogGroup;
  }
}
