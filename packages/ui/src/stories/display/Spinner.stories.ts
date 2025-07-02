import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { SpinnerProps, StudsSpinner } from '../../components/display/spinner';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta = {
  title: 'Studs/Display/Spinner',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-spinner
      ?close-on-overlay-click=${args.closeOnOverlayClick}
      ?close-on-escape=${args.closeOnEscape}
      ?disable-backdrop=${args.disableBackdrop}
      color=${ifDefined(args.color)}
      size=${ifDefined(args.size)}
      icon=${ifDefined(args.icon)}
      ?open=${args.open}
    ></studs-spinner>`,
  argTypes: {
    closeOnOverlayClick: {
      name: 'close-on-overlay-click',
      type: { name: 'boolean', required: false },
      defaultValue: false,
      description: 'Close spinner when clicking outside of it',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      },
      control: {
        type: 'boolean'
      }
    },
    closeOnEscape: {
      name: 'close-on-escape',
      type: { name: 'boolean', required: false },
      defaultValue: false,
      description: 'Close spinner when pressing escape',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      },
      control: {
        type: 'boolean'
      }
    },
    disableBackdrop: {
      name: 'disable-backdrop',
      type: { name: 'boolean', required: false },
      defaultValue: false,
      description: 'Disable the backdrop',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      },
      control: {
        type: 'boolean'
      }
    },
    open: {
      name: 'open',
      type: { name: 'boolean', required: false },
      defaultValue: false,
      description: 'Open the spinner',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      },
      control: {
        type: 'boolean'
      }
    },
    size: {
      name: 'size',
      type: { name: 'string', required: false },
      defaultValue: 'medium',
      description: 'The size of the spinner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' }
      },
      control: { type: 'select' },
      options: ['extraSmall', 'small', 'medium', 'large']
    }
  }
} satisfies Meta<SpinnerProps>;

export default meta;

type Story = StoryObj<SpinnerProps>;

export const Default: Story = {
  args: {
    open: true
  }
};

export const Icon: Story = {
  args: {
    open: true
  }
};

export const UsingButton: Story = {
  render: () => {
    function openSpinner() {
      const spinner = document.querySelector('#spinner');
      (spinner as unknown as StudsSpinner)?.toggleOpen();
    }

    return html`<studs-button @click=${() => openSpinner()}>Toggle Spinner</studs-button>
        <studs-spinner id="spinner"></studs-spinner>`;
  }
};