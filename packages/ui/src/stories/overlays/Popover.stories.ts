import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { PopoverProps, StudsPopover } from '../../components/overlays/popover';
import { position } from '../../utils/_argTypes';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta = {
  title: 'Studs/Overlays/Popover',
  tags: ['autodocs'],
  render: (args) => html`
    <div style="height: 100px">
      <studs-button
      >Popover
        <studs-popover
          position=${ifDefined(args.position)}
          icon=${ifDefined(args.icon)}
          ?close-on-click-outside=${args.closeOnClickOutside}
          ?hide-close-button=${args.hideCloseButton}
        >
          ${unsafeHTML(args.children)}
        </studs-popover>
      </studs-button
      >
    </div>`,
  argTypes: {
    ...position,
    hideCloseButton: {
      control: {
        type: 'boolean'
      }
    },
    closeOnClickOutside: {
      control: {
        type: 'boolean'
      }
    }
  }
} as Meta<StudsPopover>;

export default meta;
type Story = StoryObj<StudsPopover>;

export const Default: Story = {
  args: {
    position: 'bottom',
    icon: 'info',
    children: `
    <p slot="title">This is a popover</p>
    <studs-image src="https://ssttoolbox.widen.net/content/cusbzivu9t/jpeg/C_SCLC_InstPho_RI_Inst_StairCassetteLedgerConnector-exploded_C0.jpg?crop=true&keep=c&q=60&w=900&h=675" slot="media"></studs-image>
    <main>Popover content</main>
    <studs-button button-type="primary" size="small" slot="footer">Yes</studs-button>`
  }
};

export const Basic: Story = {
  args: {
    position: 'right',
    children: `
    <p slot="title">This is a popover</p>
    <main>Popover content</main>`
  }
};

export const NoHeader: Story = {
  args: {
    position: 'bottom',
    children: `
    <main>Popover content</main>`
  }
};

export const CloseOnClickOutside: Story = {
  args: {
    position: 'bottom',
    closeOnClickOutside: true,
    children: `
    <main>Popover content</main>`
  }
};
