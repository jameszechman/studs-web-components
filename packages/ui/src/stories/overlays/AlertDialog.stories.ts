import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { StudsAlertDialog } from '../../components/overlays/alert-dialog';

const meta = {
  title: 'Studs/Overlays/AlertDialog',
  tags: ['autodocs'],
  render: (args: any) => {
    function toggleHide() {
      const alertDialog = document.querySelector(`#${args.id}`);

      alertDialog?.removeAttribute('open');
      alert('Closed!');
    }

    return html`
      <div style="height: 300px">
        <studs-alert-dialog
          ?open="${args.open}"
          heading="${ifDefined(args.heading)}"
          type="${ifDefined(args.type)}"
          id="${ifDefined(args.id)}"
          ?static="${args.static}"
        >
          ${unsafeHTML(args.icon)} ${unsafeHTML(args.children)}

          <div slot="footer-buttons">
            <studs-button @click=${toggleHide} button-type="tertiary"
              >Button Title
            </studs-button>
            <studs-button onclick="alert('clicked')" button-type="primary"
              >Button Title
            </studs-button>
          </div>
        </studs-alert-dialog>
      </div>
    `;
  },
  argTypes: {
    toggleHide: {
      control: {
        type: 'text',
      },
      description:
        'This is an example for how to manually close when click a button within alert dialog',
      table: {
        type: {
          detail: 'text',
        },
      },
    },
  },
} satisfies Meta<StudsAlertDialog & { toggleHide: () => void }>;

export default meta;
type Story = StoryObj<
  StudsAlertDialog & {
    children: any;
    icon: any;
    toggleHide: any;
  }
>;

export const Default: Story = {
  args: {
    heading: 'Alert Dialog',
    type: 'default',
    id: 'alert-dialog-default',
    icon: `
    <studs-icon
      slot="header-icon"
      icon="settings"
      size="large"
    ></studs-icon>`,
    children: `Lorem <b>ipsum</b> dolor sit <i>amet</i>, vince adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    open: true,
    toggleHide: `function toggleHide() {
      const alertDialog = document.querySelector('#alert-dialog-default');

      alertDialog?.removeAttribute('open');
      alert('Closed!');
    }`,
  },
};

export const Contrast: Story = {
  args: {
    heading: 'Contrast Alert Dialog',
    type: 'contrast',
    id: 'alert-dialog-contrast',
    icon: `
    <studs-icon
      slot="header-icon"
      icon="settings"
      size="large"
    ></studs-icon>`,
    children: `Lorem <b>ipsum</b> dolor sit <i>amet</i>, vince adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    open: true,
  },
};

export const Success: Story = {
  args: {
    heading: 'Success Alert Dialog',
    type: 'success',
    id: 'alert-dialog-success',
    icon: `
    <studs-icon
      slot="header-icon"
      icon="check_circle"
      size="large"
    ></studs-icon>`,
    children: `Lorem <b>ipsum</b> dolor sit <i>amet</i>, vince adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    open: true,
  },
};

export const Error: Story = {
  args: {
    heading: 'Error Alert Dialog',
    type: 'error',
    id: 'alert-dialog-error',
    icon: `
    <studs-icon
      slot="header-icon"
      icon="error"
      size="large"
    ></studs-icon>`,
    children: `Lorem <b>ipsum</b> dolor sit <i>amet</i>, vince adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    open: true,
  },
};
