import { StudsAlert } from './../../components/display/alert';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta = {
  title: 'Studs/Display/Alert',
  tags: ['autodocs'],
  render: (args: any) => html`
  <studs-alert
  ?open="${args.open}"
  ?static="${args.static}"
  position="${ifDefined(args.position)}"
  heading="${ifDefined(args.heading)}"
  type="${ifDefined(args.type)}"
  message="${ifDefined(args.message)}"
  action="${ifDefined(args.action)}"
  ?closeable="${args.closeable}"
  onactionclick="${ifDefined(args.onActionClick)}"
></studs-alert>`,
  argTypes: {
    position: {
      control: {
        type: 'select'
      },
      options: ['default', 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'center'],
      description: 'The position of the alert',
      table: {
        type: {
          summary: 'string',
          detail: `"top-right" | "top-left" | "bottom-right" | "bottom-left" | "center"`
        },
        defaultValue: { summary: 'top-right' }
      }
    },
    type: {
      control: {
        type: 'select'
      },
      options: ['success', 'info', 'error', 'bottom', 'warning'],
      description: 'The type of the alert',
    },
  }
} satisfies Meta<StudsAlert>;

export default meta;
type Story = StoryObj<StudsAlert>;

export const Default: Story = {
    args: {
      position: 'top-right',
      type: 'bottom',
      message: `This is an bottom  alert`,
      heading: 'Title',
      open: true,
      closeable: true,
    }
  };