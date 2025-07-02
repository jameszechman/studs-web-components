import style from '@studs/styles/components/menuLabel';
import { studsElement } from '../../decorators/studs-element.ts';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { StudsElement } from '../../mixins/studsElement.ts';
import { consume } from '@lit/context';
import { menuContext, type StudsMenu } from './menu.ts';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AnchorElement } from '../../mixins/anchorElement';

/**
 * @element studs-menu-label
 *
 * @slot - The default slot for the Menu Label's content
 */
@studsElement('studs-menu-label')
export class StudsMenuLabel extends AnchorElement(StudsElement(LitElement)) {
  /**
   * The type of menu
   * @private
   */
  @consume({context: menuContext}) private type: StudsMenu['type'];
  static override styles = style as CSSResult;
  override render(): TemplateResult<1> {
    const classes = {
      label: true,
      [`-${this.type}`]: true
    }
    return when(this.href, () => html`<a
        class=${classMap(classes)}
        href=${this.href}
        target=${ifDefined(this.target)} 
        download=${ifDefined((this.download))}
        hreflang=${ifDefined((this.hreflang))}
        ping=${ifDefined((this.ping))}
        referrerpolicy=${ifDefined(this.referrerpolicy)}
        rel=${ifDefined(this.rel)}
      >
      <slot></slot>
      </a>`, () => html`<div class="${classMap(classes)}"><slot></slot></div>`)
  }
}