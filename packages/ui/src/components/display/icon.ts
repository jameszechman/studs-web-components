import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Icon, IconController } from '../../controllers/iconController';
import { studsElement } from '../../decorators/studs-element';
import { StudsElement } from '../../mixins/studsElement.ts';

export interface IconProps {
  icon: Icon;
  size: 'small' | 'medium' | 'large' | 'extraLarge';
  color: 'inherit' | 'primary' | 'secondary' | 'tertiary';
}

/**
 * @element studs-icon
 *
 */
@studsElement('studs-icon')
export class StudsIcon extends StudsElement(LitElement) {
  /**
   * The icon to display
   */
  @property({ type: String }) icon: IconProps['icon'] = 'info';
  /**
   * The size of the icon
   */
  @property({ type: String }) size: IconProps['size'] = 'medium';
  /**
   * The color of the icon
   */
  @property({ type: String }) color: IconProps['color'] = 'inherit';

  private iconController = new IconController(this);

  render() {
    if (this.icon)
      return this.iconController.icon(this.icon, {
        size: this.size,
        color: this.color
      });
    return null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-icon': StudsIcon;
  }
}