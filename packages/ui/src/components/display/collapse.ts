import { CSSResult, LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import style from '@studs/styles/components/collapse';
import { studsElement } from '../../decorators/studs-element';
import { ExpandableController } from '../../controllers/expandable.ts';
import { watch } from '../../directives/watch.ts';
import { StudsElement } from '../../mixins/studsElement.ts';

@studsElement('studs-collapse')
export class StudsCollapse extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  protected expandable = new ExpandableController(this);
  /**
   * Indicates if the collapse component is open or closed
   */
  @property({ type: Boolean, reflect: true }) open: boolean = false;
  /**
   * Indicates if the collapse component is disabled
   */
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  /**
   * The alignment of the summary text within the collapse component
   */
  @property({ type: String, attribute: 'summary-align' })
  summaryAlign: string = 'left';
  /**
   * The variant of the collapse component (link or icon)
   */
  @property({ type: String, reflect: true }) variant: 'link' | 'icon' = 'link';

  @watch('open')
  updateOpen() {
    this.updateComplete.then(() => {
      if(!this.disabled) this.expandable.toggle(this.open);
    });
  }

  render() {
    const summaryClass = {
      '-left': this.summaryAlign === 'left',
      '-right': this.summaryAlign === 'right',
      '-link': this.variant === 'link',
      '-icon': this.variant === 'icon',
    };
    return html`
      <details
        class=${classMap({ collapse: true, ...summaryClass })}
        ?disabled=${this.disabled}
      >
        <summary class="summary">
          <slot name="summary">Details</slot>
        </summary>
        <div class="content">
          <slot></slot>
        </div>
      </details>
    `;
  }
}
