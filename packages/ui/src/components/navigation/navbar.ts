import { CSSResult, html, LitElement } from 'lit';
import style from '@studs/styles/components/navbar';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

/**
 * @element studs-navbar
 *
 */

@studsElement('studs-navbar')
export class StudsNavbar extends StudsElement(LitElement) {
  static styles = style as CSSResult;

  render() {
    return html`
      <nav class="navbar" role="menubar">
        <slot></slot>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-navbar': StudsNavbar;
  }
}
