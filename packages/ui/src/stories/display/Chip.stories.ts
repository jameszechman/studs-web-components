import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { icon, size } from '../../utils/_argTypes';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ChipProps } from '../../components/display/chip';

const meta = {
  title: 'Studs/Display/Chip',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-chip
      icon="${ifDefined(args.icon)}"
      iconPosition="${ifDefined(args.iconPosition)}"
      size="${ifDefined(args.size as string === 'default' ?'medium' : args.size)}"
      ?disabled="${args.disabled}"
      ?selected="${args.selected}"
      ?clickable="${args.clickable}"
      ?deletable="${args.deletable}"
      class="${ifDefined(args.class)}"
    >${args.children}
    </studs-chip
    >`,
  argTypes: {
    ...icon,
    ...size,
    disabled: {
      control: 'boolean'
    },
    selected: {
      control: 'boolean'
    },
    clickable: {
      control: 'boolean'
    },
    deletable: {
      control: 'boolean'
    }
  }
} satisfies Meta<ChipProps>;

export default meta;
type Story = StoryObj<ChipProps>;

export const Default: Story = {
  args: {
    children: 'Default',
    deletable: false
  }
};

export const Primary: Story = {
  args: {
    children: 'Primary',
    deletable: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
    deletable: true
  }
};

export const ChipIcon: Story = {
  args: {
    deletable: false,
    clickable: true,
    icon: 'add',
    children: 'Icon'
  }
};

export const ChipLetter: Story = {
  args: {
    deletable: false,
    clickable: true,
    children: html`<div slot="accessory" class="letter">A</div>
      Letter`
  }
};
