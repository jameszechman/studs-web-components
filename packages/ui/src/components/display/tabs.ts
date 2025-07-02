import style from '@studs/styles/components/tabs';
import { studsElement } from '../../decorators/studs-element';
import { CSSResult, html, LitElement } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { onKeyDown } from '../../utils/shared';
import { ifDefined } from 'lit/directives/if-defined.js';
import { watch } from '../../directives/watch';
import { StudsElement } from '../../mixins/studsElement.ts';

export interface TabProps {
  selectedIndex?: number;
  tabDirection?: 'row' | 'column';
  variant: 'line' | 'contained';
  disabled?: boolean;
}

/**
 * @element studs-tabs
 *
 * @slot tab - The default slot for the Tabs's tab content
 * @slot panel - The default slot for the Tabs's panel content
 */
@studsElement('studs-tabs')
export class StudsTabs extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * The selected index of the tabs
   */
  @property({ type: Number }) selected: number = 0;
  /**
   * The direction of the tabs
   */
  @property({ type: String }) direction?: 'inline' | 'block' = 'inline';
  /**
   * The variant of the tabs
   */
  @property({ type: String }) variant: 'contained';
  /**
   * Whether the tabs are disabled or not
   */
  @property({ type: Boolean }) disabled?: boolean;
  @queryAssignedElements({ slot: 'tab' }) private tabs!: Element[];
  @queryAssignedElements({ slot: 'panel' }) private panels!: Element[];

  /**
   * The selected tab and panel
   */
  public get selectedTab() {
    const tab = this.tabs.find((tab) => tab.getAttribute('aria-selected') === 'true');
    const panel = this.panels.find((panel) => panel.getAttribute('aria-expanded') === 'true');
    if (tab && panel) return [tab, panel];
    const firstTab = this.tabs[0];
    const firstPanel = this.panels[0];
    if (firstTab && firstPanel) return [firstTab, firstPanel];
  }

  private get getActiveTabsLength(): number {
    return this.tabs?.length;
  }

  @watch('selected')
  handleSelectedChange() {
    if (typeof this.selected === 'number')
      this.updateComplete.then(() => {
        const isGreaterThan = this.selected > this.getActiveTabsLength - 1;
        const isLessThan = this.selected < 0;
        this.selectTab(isGreaterThan ? this.getActiveTabsLength - 1 : isLessThan ? 0 : this.selected);
      });
  }

  render() {
    return html`
      <div class=${classMap({
        tabsComponent: true,
        [`-${this.direction}`]: true
      })}>
        <nav
          role="tablist"
          aria-orientation=${ifDefined(this.direction)}
          class=${classMap({
            tabs: true,
            [`-${this.variant}`]: !!this.variant,
            [`-${this.direction}`]: !!this.direction
          })}>
          <slot
            name="tab"
            @click=${this.handleSelect}
            @keydown=${this.onKeyDown}
            @slotchange=${this.handleTabSlotChange}
            ?disabled=${this.disabled}
          ></slot>
        </nav>
        <div class="panel">
          <slot name="panel" @slotchange=${this.handlePaneSlotChange}></slot>
        </div>
      </div>
    `;
  }

  private selectTab(tabIndex: number): void {
    if (this.disabled) return;

    const setTabActive = (index: number) => {
      if (index <= this.getActiveTabsLength) {
        if (!this.tabs[index].hasAttribute('disabled')) {
          this.tabs[index].setAttribute('tabindex', '0');
          this.tabs[index].setAttribute('aria-selected', 'true');
          this.panels[index].setAttribute('aria-expanded', 'true');
          this.panels[index].removeAttribute('hidden');
          this.dispatchEvent(new CustomEvent('change', { detail: { tabIndex } }));
        } else {
          setTabActive(index + 1);
        }
      }
    };

    if (this.selectedTab && this.selectedTab.length > 0) this.selectedTab.forEach((tab) => {
      if (tab.hasAttribute('aria-selected')) {
        tab.setAttribute('tabindex', '-1');
        tab.setAttribute('aria-selected', 'false');
      }
      if (tab.hasAttribute('aria-expanded')) {
        tab.setAttribute('aria-expanded', 'false');
        tab.setAttribute('hidden', 'true');
      }
    });

    setTabActive(tabIndex);
  }

  private handleSelect = (e: Event): void => {
    if (this.disabled) return;
    const index = this.tabs.indexOf(e.target as Element);
    this.selected = index;
  };

  private onKeyDown = (event: KeyboardEvent) => onKeyDown(event, {
    triggering: () => {
      event.preventDefault();
      this.handleSelect(event);
    }
  }, {
    triggers: {
      startEnd: true
    },
    items: this.tabs,
    axis: {
      inline: {
        next: ['ArrowRight', 'Right'],
        prev: ['ArrowLeft', 'Left']
      },
      block: {
        next: ['ArrowDown', 'Down'],
        prev: ['ArrowUp', 'Up']
      }
    }[this.direction || 'inline']
  });

  private handleTabSlotChange = (event: Event) => {
    const target = event.target as HTMLSlotElement;
    const assignedElements = target.assignedElements();
    assignedElements.forEach((tab, index) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', `false`);
      tab.setAttribute('tabindex', tab.getAttribute('tabindex') || '-1');
      tab.setAttribute('aria-controls', tab.getAttribute('aria-controls') || `panel-${index}`);
      tab.setAttribute('id', tab.id || `tab-${index}`);
    });
  };

  private handlePaneSlotChange = (event: Event) => {
    const target = event.target as HTMLSlotElement;
    const assignedElements = target.assignedElements();
    assignedElements.forEach((panel, index) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', panel.getAttribute('aria-labelledby') || `tab-${index}`);
      panel.setAttribute('id', panel.getAttribute('id') || `panel-${index}`);
      panel.setAttribute('hidden', `true`);
      panel.setAttribute('aria-expanded', `false`);
      panel.setAttribute('tabindex', '-1');
    });
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-tabs': StudsTabs;
  }
}