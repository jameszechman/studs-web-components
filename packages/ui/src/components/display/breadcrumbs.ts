import style from '@studs/styles/components/breadcrumbs';
import { CSSResult, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

export interface BreadcrumbsProps {
  separator: '/' | '>';
  children?: string;
}

/**
 * @element studs-breadcrumbs
 *
 * @slot - The default Slot for Breadcrumbs
 */
@studsElement('studs-breadcrumbs')
export class StudsBreadcrumbs extends StudsElement(LitElement) {
  static styles = style as CSSResult;

  /**
   * The separator to display between breadcrumbs
   */
  @property({ type: String })
  separator: BreadcrumbsProps['separator'] = '/';

  render() {
    return html`
      <nav aria-label="breadcrumbs" class=${classMap({
        breadcrumbs: true,
        '-slash': this.separator === '/',
        '-angle': this.separator === '>'
      })}>
        <slot @slotchange=${this.onSlotChange}></slot>
      </nav>
    `;
  }

  private onSlotChange(e: Event) {
    const assignedElements = (e.target as HTMLSlotElement).assignedElements();
    if (assignedElements.length > 0) {
      assignedElements?.forEach((child: Element) => {
        if (!(child instanceof HTMLAnchorElement)) {
          throw new Error(
            'studs-breadcrumbs: child element must be an anchor tag'
          );
        } else {
          child.classList.add('crumb');
        }
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-breadcrumbs': StudsBreadcrumbs;
  }
}