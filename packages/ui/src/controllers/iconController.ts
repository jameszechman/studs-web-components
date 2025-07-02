import style from '@studs/styles/components/icons';
import { html, ReactiveControllerHost } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { applyStylesToHost } from '../utils/shared';

export interface IconOptions {
  size?: IconSize;
  color?: IconColor;
}

export type Icon = string;
export type IconSize =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'extraLarge'
  | 'xxlarge';
export type IconColor = 'inherit' | 'primary' | 'secondary' | 'tertiary';

interface IconControllerProps {
  icon?: Icon;
  options?: IconOptions;
}

export class IconController {
  constructor(host: ReactiveControllerHost) {
    // @ts-expect-error
    host.addController(this);
    applyStylesToHost(host, style as string);
  }

  public icon(icon: IconControllerProps['icon'], options?: IconOptions) {
    if (icon) {
      return html`
        <i
          part="studs-icon"
          class=${classMap({
            'studs-icon': true,
            icon: true,
            [`-${options?.size}`]: options?.size || false,
            [`-${options?.color}`]: options?.color || false
          })}
        >${icon}</i
        >
      `;
    }
  }
}
