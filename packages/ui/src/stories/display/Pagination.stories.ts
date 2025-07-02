import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsPagination } from '../../components/display/pagination';

const meta = {
  title: 'Studs/Display/Pagination',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-pagination
      current-page=${ifDefined(args.currentPage)}
      total-items=${ifDefined(args.totalItems)}
      items-per-page=${ifDefined(args.itemsPerPage === 'default' ? 10 : args.itemsPerPage)}
      ?has-jumper=${args.hasJumper}
      jumper-label=${ifDefined(args.jumperLabel)}
      ?has-select=${args.hasSelect}
      ?disabled=${args.disabled}
      select-label=${ifDefined(args.selectLabel)}
    >
    </studs-pagination>`,
  argTypes: {
    totalItems: {
      control: {
        type: 'number',
        default: 1500
      }
    },
    itemsPerPage: {
      control: { type: 'select' },
      options: ['default', 10, 25, 50, 100],
      defaultValue: 10,
      description: 'The number of items per page',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 10 },
      },
    },
    hasJumper: {
      control: {
        type: 'boolean',
        default: true
      }
    },
    disabled: {
      control: {
        type: 'boolean',
        default: false
      }
    },
    jumperLabel: {
      control: {
        type: 'text',
        default: 'Go To'
      }
    },
    hasSelect: {
      control: {
        type: 'boolean',
        default: true
      }
    },
    selectLabel: {
      control: {
        type: 'text',
        default: 'Show'
      }
    }
  }
} satisfies Meta<StudsPagination>;

export default meta;
type Story = StoryObj<StudsPagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalItems: 1500,
    itemsPerPage: 10
  }
};

export const Jumper: Story = {
  args: {
    currentPage: 1,
    totalItems: 1500,
    hasJumper: true
  }
};

export const Select: Story = {
  args: {
    currentPage: 1,
    totalItems: 1500,
    hasSelect: true
  }
};

export const JumperSelect: Story = {
  args: {
    currentPage: 1,
    totalItems: 1500,
    hasJumper: true,
    jumperLabel: 'Go',
    hasSelect: true,
    selectLabel: 'Show Items'
  }
};
