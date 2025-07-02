import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { StudsToggleButton } from '../../components/display/toggle-button';
import { contentDirection, icon, size, variants } from '../../utils/_argTypes';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Studs/Display/ToggleButton',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-toggle-button
      button-type="${ifDefined(args.buttonType)}"
      size="${ifDefined(args.size)}"
      variant="${ifDefined(args.variant === 'default' ? 'primary' : args.variant)}"
      icon-position="${ifDefined(args.iconPosition)}"
      content-direction="${ifDefined(args.contentDirection)}"
      class="${ifDefined(args.class)}"
      icon="${ifDefined(args.icon)}"
      ?disabled="${args.disabled}"
      ?full-width="${args.fullWidth}"
      onclick="console.log('clicked')"
      ?selected=${args.selected}
    >${unsafeHTML(args.children)}
    </studs-toggle-button
    >`,
  argTypes: {
    ...variants({
      name: 'buttonType',
      options: ['cta', 'tertiary', 'link', 'icon', 'image']
    }),
    ...size,
    ...contentDirection,
    ...icon,
    disabled: {
      control: { type: 'boolean' }
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline']
    },
    selected: {
      control: { type: 'boolean' }
    }
  }
} satisfies Meta<StudsToggleButton>;

export default meta;
type Story = StoryObj<StudsToggleButton & { children: any }>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args

export const Primary: Story = {
  args: {
    buttonType: 'primary',
    children: `Button`
  }
};

export const Selected: Story = {
  args: {
    buttonType: 'primary',
    selected: true,
    children: `Button`
  }
};

export const Image: Story = {
  args: {
    buttonType: 'image',
    children: `<img slot="media" src="https://picsum.photos/200/300" /> Image Button`
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: `Button`
  }
};

export const LeftIcon: Story = {
  args: {
    iconPosition: 'start',
    icon: 'info',
    children: `Button`
  }
};

export const RightIcon: Story = {
  args: {
    iconPosition: 'end',
    icon: 'info',
    children: `Button`
  }
};

export const block: Story = {
  args: {
    icon: 'info',
    contentDirection: 'block',
    children: `Button`
  }
};

export const Large: Story = {
  args: {
    size: 'large',
    children: `Button`
  }
};

export const Small: Story = {
  args: {
    size: 'small',
    children: `Button`
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: `Button`
  }
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: `Button`
  }
};