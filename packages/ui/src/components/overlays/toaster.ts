import style from '@studs/styles/components/toaster';
import { CSSResult, html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';
import { studsElement } from '../../decorators/studs-element';
import { StudsToast } from './toast';
import { StudsElement } from '../../mixins/studsElement.ts';

/**
 * @element studs-toaster
 *
 */
@studsElement('studs-toaster')
export class StudsToaster extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * The position of the toaster
   */
  @state() position: StudsToast['position'] = 'top-right';
  @state() toasts: Array<Partial<StudsToast>> = [];

  public createToast(data: StudsToast) {
    this.toasts = [...this.toasts, data];
    this.requestUpdate();
  }

  public createStandardToast(args: StudsToast) {
    this.toasts = [...this.toasts, { ...args, type: 'info' }];
    this.requestUpdate();
  }

  public createErrorToast(args: StudsToast) {
    this.toasts = [...this.toasts, { ...args, type: 'error' }];
    this.requestUpdate();
  }

  public createWarningToast(args: StudsToast) {
    this.toasts = [...this.toasts, { ...args, type: 'warning' }];
    this.requestUpdate();
  }

  public createSuccessToast(args: StudsToast) {
    this.toasts = [...this.toasts, { ...args, type: 'success' }];
    this.requestUpdate();
  }

  render() {
    const classes = {
      toaster: true,
      [`-${this.position}`]: true
    };
    return html`
      <div class=${classMap(classes)}>
        ${map(this.toasts, (toast) => {
          return html`
            <studs-toast
              static
              open
              type=${toast?.type || 'info'}
              ?closeable=${toast?.closeable || false}
              heading=${toast?.heading}
              message=${toast?.message}
              duration=${toast?.duration}
            ></studs-toast>`;
        })}
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-toaster': StudsToaster;
  }
}
