import { Directive, directive, PartInfo } from 'lit/directive.js';
import { IconController, IconOptions } from '../controllers/iconController';

class IconDirective extends Directive {
  public iconController: IconController;

  constructor(partInfo: PartInfo) {
    super(partInfo);
    const host = (partInfo as any).options?.host;
    this.iconController = new IconController(host);
  }

  render(icon: string, options?: IconOptions) {
    if (icon) return this.iconController.icon(icon, options);
  }
}

// Create the directive function
export const icon = directive(IconDirective);