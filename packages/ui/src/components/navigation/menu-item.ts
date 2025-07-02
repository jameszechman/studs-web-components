import style from "@studs/styles/components/menuItem";
import { studsElement } from '../../decorators/studs-element.ts';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsElement } from '../../mixins/studsElement.ts';
import { when } from 'lit/directives/when.js';
import {consume} from '@lit/context';
import { menuContext, StudsMenu } from './menu.ts';
import { classMap } from 'lit/directives/class-map.js';
import { AnchorElement } from '../../mixins/anchorElement.ts';

/**
 * @element studs-menu-item
 *
 * @slot - The default slot for the Menu Item's content
 */

@studsElement('studs-menu-item')
export class StudsMenuItem extends AnchorElement(StudsElement(LitElement)) {
  /**
   * The type of menu
   * @private
   */
  @consume({context: menuContext}) private type: StudsMenu['type'];

  static override styles: CSSResult = style as CSSResult;

  override connectedCallback() {
    super.connectedCallback();
    if(!this.hasAttribute('role')) this.setAttribute('role', 'menuitem');
  }

  private renderSlots() {
    return html`
      <slot name="prefix"></slot>
      <slot></slot>
      <slot name="suffix"></slot>
      <slot name="action"></slot>
    `
  }

  override render(): TemplateResult<1> {
    const classes = {
      item: true,
      [`-${this.type}`]: true
    }
    return when(this.href, () => html`<a
        part="wrapper"
        class=${classMap(classes)}
        href=${this.href}
        target=${ifDefined(this.target)} 
        download=${ifDefined((this.download))}
        hreflang=${ifDefined((this.hreflang))}
        ping=${ifDefined((this.ping))}
        referrerpolicy=${ifDefined(this.referrerpolicy)}
        rel=${ifDefined(this.rel)}
      >
        ${this.renderSlots()}
      </a>`, () => html`<div class=${classMap(classes)} part="wrapper">${this.renderSlots()}</div>`)
  }
}