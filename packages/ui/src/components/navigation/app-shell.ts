import style from '@studs/styles/components/app-shell';
import { CSSResult, html, LitElement } from 'lit';
import { studsElement } from '../../decorators/studs-element.ts';
import { StudsElement } from '../../mixins/studsElement.ts';
import { property } from 'lit/decorators.js';

export interface AppShellProps {
  navWidth: string;
}

/**
 * @element studs-app-shell
 *
 * @slot - The default Slot for app-shell
 */
@studsElement('studs-app-shell')
export class StudsAppShell extends StudsElement(LitElement) {
  static styles = style as CSSResult;

  /**
   * Whether the sidebar is resizable
   */
  @property({ type: Boolean }) resizable = false;

  render() {
    return html`
      <div class="app-shell">
        <slot name="header"></slot>
        <slot name="sidebar"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }
}
