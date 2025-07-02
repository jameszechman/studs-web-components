import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { StudsAlertDialogGroup } from '../../components/overlays/alert-dialog-group';

const meta = {
  title: 'Studs/Overlays/AlertDialogGroup',
  tags: ['autodocs'],
  render: (args: any) => {
    return html`
      <div style="height: 900px">
        <studs-alert-dialog-group>
          ${unsafeHTML(args.children)}
        </studs-alert-dialog-group>
      </div>
    `;
  },
} satisfies Meta<StudsAlertDialogGroup & { toggleHide: () => void }>;

export default meta;
type Story = StoryObj<
  StudsAlertDialogGroup & {
    children: any;
  }
>;

export const Default: Story = {
  args: {
    children: `
    <studs-alert-dialog
      ?open"
      heading="Alert Dialog 3"
      static=""
      id='alert-dialog-3'
    >
      <studs-icon
        slot="header-icon"
        icon="settings"
        size="large"
      ></studs-icon>

      'Lorem <b>ipsum</b> dolor sit <i>amet</i>, vince adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      <div slot="footer-buttons">
        <studs-button button-type="tertiary"
          >Button Title
        </studs-button>
        <studs-button onclick="alert('clicked')" button-type="primary"
          >Button Title
        </studs-button>
      </div>
    </studs-alert-dialog>
    <studs-alert-dialog
      ?open"
      heading="Alert Dialog 2"
      static=""
      id='alert-dialog-2'
    >
      <studs-icon
        slot="header-icon"
        icon="settings"
        size="large"
      ></studs-icon>

      'Lorem <b>ipsum</b> dolor sit <i>amet</i>, vince adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      <div slot="footer-buttons">
        <studs-button button-type="tertiary"
          >Button Title
        </studs-button>
        <studs-button onclick="alert('clicked')" button-type="primary"
          >Button Title
        </studs-button>
      </div>
    </studs-alert-dialog>
    <studs-alert-dialog
      ?open"
      heading="Alert Dialog 1"
      static=""
      id='alert-dialog-1'
    >
      <studs-icon
        slot="header-icon"
        icon="settings"
        size="large"
      ></studs-icon>

      'Lorem <b>ipsum</b> dolor sit <i>amet</i>, vince adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      <div slot="footer-buttons">
        <studs-button button-type="tertiary"
          >Button Title
        </studs-button>
        <studs-button onclick="alert('clicked')" button-type="primary"
          >Button Title
        </studs-button>
      </div>
    </studs-alert-dialog>`,
  },
};
