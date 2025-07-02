import style from '@studs/styles/components/menu';
import { CSSResult, CSSResultGroup, html, LitElement, nothing, TemplateResult } from 'lit';
import { PopperElement } from '../../mixins/popperElement.ts';
import { studsElement } from '../../decorators/studs-element.ts';
import { StudsElement } from '../../mixins/studsElement.ts';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { watch } from '../../directives/watch.ts';
import { StudsList } from '../display/list.ts';
import { StudsListItem } from '../display/list-item.ts';
import { styleMap } from 'lit/directives/style-map.js';
import {createContext, provide} from '@lit/context';

export const menuContext = createContext('menu');

/**
 * @element studs-menu
 *
 * @slot trigger - The default slot for the Menu's trigger content
 * @slot - The default slot for the Menu's content
 */

@studsElement('studs-menu')
export class StudsMenu extends PopperElement(StudsElement(LitElement)) {
  /**
   * The amount of columns to render into the menu
   */
  @property({type: Number}) cols?: number;
  @property({type: Boolean, attribute: 'disable-arrow'}) disableArrow: boolean = false;
  /**
   * The type of menu
   */
  @provide({context: menuContext})
  @property({type: String}) type?: 'dropdown' | 'drawer' | 'mega' = 'dropdown';

  static styles: CSSResultGroup = [super.styles as CSSResult, style as CSSResult];

  constructor() {
    super();
    this.on = 'toggle';
    this.strategy = 'fixed';
    this.useAvailableWidth = true;
  }

  private get isGrid() {
    return this.cols && this.cols > 1 || false;
  }
  @watch('cols')
  handleColsChange() {
    if(this.isGrid) this.style.setProperty('--cols', `${this.cols}`);
  }

  @watch('type')
  handleTypeChange() {
    if(this.type === 'mega') {
      this.offset = 0;
      this.disableArrow = true;
      this.padding = 0;
    }
  }

  override render(): TemplateResult<1> {
    const position = this.position.split('-')[0];
    return html`
      ${this.type === 'mega' && this.popperOpen ? html`<div class="backdrop" style="${styleMap({
        top: this.top +'px'
      })}"></div>` : nothing}
      <slot name="trigger" @slotchange=${this.registerTriggerElement}></slot>
      <div role="menu" part="menu" class="popper ${classMap({
        [`-grid`]: this.isGrid,
        [`-${this.type}`]: true,
        [`-${position}`]: position || false,
      })}">
        <slot name="title"></slot>
        <div class="menu -content">
          <slot @slotchange=${this.onSlotChange}></slot>
        </div>
        ${
        !this.disableArrow ? html`<div id="arrow"></div>` : nothing
        }
      </div>
    `;
  }

  private registerTriggerElement(e: Event) {
    const assignedElements = (e.target as HTMLSlotElement).assignedElements();
    if(assignedElements.length && assignedElements.length > 1) console.warn('studs-menu does not support more than one trigger');
    else if (assignedElements.length) this.element = assignedElements[0] as HTMLElement;
  }

  private onSlotChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const assigned = target.assignedElements();
    assigned.forEach((el) => {
        el.setAttribute('role', 'menuitem');
        if(el instanceof StudsList || el instanceof StudsListItem) {
          Object.assign(el, {
            icon: 'chevron_right',
            direction: 'end',
            disableIndentation: true
          })
        }
        if(el instanceof StudsMenu) {
          el.setAttribute('role', 'menu');
          el.disableArrow = true;
          el.flipOptions = {
            boundary: window.document.body,
          };
          if(!el.hasAttribute('offset')) el.offset = 0;
          if(!el.hasAttribute('position')) el.position = 'right-end';
        }
      }
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-menu': StudsMenu;
  }
}