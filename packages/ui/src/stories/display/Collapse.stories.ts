import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsCollapse } from '../../components/display/collapse';

const meta = {
  title: 'Studs/Display/Collapse',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-collapse
      .open=${args.open}
      summary-align=${ifDefined(args.summaryAlign)}
      variant=${ifDefined(args.variant)}
      ?disabled="${args.disabled}"
    >
      <span slot="summary">Details</span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </studs-collapse>
  `,
  argTypes: {
    open: {
      control: 'boolean',
    },
    summaryAlign: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    variant: {
      control: { type: 'select' },
      options: ['link', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<StudsCollapse>;

export default meta;
type Story = StoryObj<StudsCollapse>;

export const Default: Story = {
  args: {
    open: false,
    summaryAlign: 'left',
    disabled: false,
  },
};

export const WithIcon: Story = {
  args: {
    open: false,
    summaryAlign: 'left',
    variant: 'icon',
    disabled: false,
  },
};
