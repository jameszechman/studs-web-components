import style from '@studs/styles/components/menuTitle';
import { studsElement } from '../../decorators/studs-element.ts';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { StudsElement } from '../../mixins/studsElement.ts';

/**
 * @element studs-menu-title
 *
 * @slot - The default slot for the Menu Title's content
 * @slot actions - The slot for the Menu Title's actions
 */
@studsElement('studs-menu-title')
export class StudsMenuTitle extends StudsElement(LitElement) {
  static override styles = style as CSSResult;
  override render(): TemplateResult<1> {
    return html`
      <div><slot></slot><slot name="actions"></slot></div>
      <studs-divider></studs-divider>
    `
  }
}