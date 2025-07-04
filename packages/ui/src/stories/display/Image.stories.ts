import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsImageProps } from '../../components/display/image';

const meta = {
  title: 'Studs/Display/Image',
  tags: ['autodocs'],
  render: (args) =>
    html`
      <studs-image
        src=${ifDefined(args.src)}
        small=${ifDefined(args.small)}
        medium=${ifDefined(args.medium)}
        large=${ifDefined(args.large)}
        alt=${ifDefined(args.alt)}
        caption=${ifDefined(args.caption)}
      ></studs-image>`,
  argTypes: {}
} satisfies Meta<StudsImageProps>;
export default meta;

export const Default: StoryObj<StudsImageProps> = {
  args: {
    src: 'https://ssttoolbox.widen.net/content/whccz2ba5x/jpeg/homepage-hero-at3g.jpeg',
    alt: 'A picture of a box.'
  }
};

export const Placeholder: StoryObj<StudsImageProps> = {
  args: {}
};

export const srcSet: StoryObj<StudsImageProps> = {
  args: {
    small:
      'https://ssttoolbox.widen.net/content/ck8bcx0mzm/png/homepage-agpd-feature.png?crop=false&position=c&color=ffffffff&w=900&h=675',
    medium:
      'https://ssttoolbox.widen.net/content/excmjgpxp4/jpeg/C-C-2024-homepage-promo.jpeg',
    large:
      'https://ssttoolbox.widen.net/content/whccz2ba5x/jpeg/homepage-hero-at3g.jpeg'
  }
};

export const Caption: StoryObj<StudsImageProps> = {
  args: {
    src: 'https://ssttoolbox.widen.net/content/whccz2ba5x/jpeg/homepage-hero-at3g.jpeg',
    caption: 'This is a caption.'
  }
};
