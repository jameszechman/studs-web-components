import { CSSResult, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import style from '@studs/styles/components/skeleton';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

export interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect';
  width?: string;
  height?: string;
  animation?: 'wave' | 'pulse' | 'linear';
}

/**
 * @element studs-skeleton
 *
 */

@studsElement('studs-skeleton')
export class StudsSkeleton extends StudsElement(LitElement) {
  static styles = style as CSSResult;
  /**
   * The variant of the skeleton
   */
  @property({ type: String }) variant: SkeletonProps['variant'] = 'rect';
  /**
   * The width of the skeleton
   */
  @property({ type: String }) width: SkeletonProps['width'] = '100%';
  /**
   * The height of the skeleton
   */
  @property({ type: String }) height: SkeletonProps['height'] = '100%';
  /**
   * The animation of the skeleton
   */
  @property({ type: String }) animation: SkeletonProps['animation'] = 'linear';

  render() {
    return html`
      <div
        role="progressbar"
        aria-busy="true"
        aria-label="Content loading"
        class=${classMap({
          skeleton: true,
          [`-${this.variant}`]: true,
          [`-${this.animation}`]: true
        })}
        style=${styleMap({
          width: this.width || '100%',
          height: this.height || '100%'
        })}
      ></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-skeleton': StudsSkeleton;
  }
}