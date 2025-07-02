import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsBadge } from '../../components/display/badge';
import { icon, size } from '../../utils/_argTypes';

const meta = {
  title: 'Studs/Display/Badge',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-badge
      icon=${ifDefined(args.icon)}
      count=${ifDefined(args.count)}
      max=${ifDefined(args.max)}
      ?show-zero=${args.showZero}
      size=${ifDefined(args.size as string === 'default' ? 'medium' : args.size)}
      position=${ifDefined(args.position as string === 'default' ? 'top-right' : args.position)}
      color=${ifDefined(args.color as string === 'default' ? 'primary' : args.color)}
      ?marker=${args.marker}
    >
      ${ifDefined(args.children)}
    </studs-badge>`,
  argTypes: {
    ...size,
    ...icon,
    count: {
      control: {
        type: 'number',
        min: 0,
        max: 999,
        step: 1
      }
    },
    max: {
      control: {
        type: 'number',
        min: 0,
        max: 999,
        step: 1
      }
    },
    showZero: {
      control: {
        type: 'boolean'
      }
    },
    position: {
      control: {
        type: 'select'
      },
      options: ['default', 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'center'],
      description: 'The position of the badge',
      table: {
        type: {
          summary: 'string',
          detail: `"top-right" | "top-left" | "bottom-right" | "bottom-left" | "center"`
        },
        defaultValue: { summary: 'top-right' }
      }
    },
    color: {
      control: {
        type: 'select'
      },
        options: ['default', 'primary', 'info', 'warning', 'error', 'success'],
        description: 'The color of the badge',
        table: {
          type: {
            summary: 'string',
            detail: `"primary" | "info" | "warning" | "error" | "success"`
          },
          defaultValue: { summary: 'primary' }
        }
    },
    marker: {
      control: {
        type: 'boolean'
      }
    }
  }
} satisfies Meta<StudsBadge>;

export default meta;
type Story = StoryObj<StudsBadge>;

export const Default: Story = {
  args: {
    icon: 'info',
    count: 1,
    max: 99,
    showZero: false,
    size: 'medium',
    position: 'top-right',
    color: 'primary',
    marker: false
  }
};

export const Icon: Story = {
  args: {
    icon: 'info',
    count: 0
  }
};

export const Info: Story = {
  args: {
    count: 5,
    max: 99,
    showZero: false,
    size: 'medium',
    position: 'center',
    color: 'info',
    marker: false
  }
};

export const Warning: Story = {
  args: {
    count: 17,
    max: 99,
    showZero: false,
    size: 'medium',
    position: 'center',
    color: 'warning',
    marker: false
  }
};

export const Error: Story = {
  args: {
    count: 102,
    max: 99,
    showZero: false,
    size: 'medium',
    position: 'center',
    color: 'error',
    marker: false
  }
};

export const Success: Story = {
  args: {
    count: 22,
    max: 99,
    showZero: false,
    size: 'medium',
    position: 'center',
    color: 'success',
    marker: false
  }
};

export const Slot: Story = {
  args: {
    count: 1,
    size: 'medium',
    marker: true,
    children: html`<studs-chip>Chip</studs-chip>`
  }
}