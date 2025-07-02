import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { StudsDrawer } from '../../components/overlays/drawer.ts';

const meta = {
  title: 'Studs/Overlays/Drawer',
  tags: ['autodocs'],
  render: (args) => html`<studs-drawer
    position=${args.position}
    size=${args.size}
    ?open=${args.open}
    ?close-on-esc=${args.closeOnEsc}
    @on-toggle=${(e: CustomEvent) => {
      console.log('on-toggle', e.detail);
    }}
  >
    ${args.children}
  </studs-drawer>`,
  argTypes: {
    position: {
      control: {
        type: 'select',
      },
      options: ['default', 'top', 'right', 'bottom', 'left']
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['default', 'small', 'medium', 'large', 'full']
    },
    open: {
      control: {
        type: 'boolean',
      }
    },
    closeOnEsc: {
      control: {
        type: 'boolean',
      }
    }
  }
} satisfies Meta<StudsDrawer>;

export default meta;
type Story = StoryObj<StudsDrawer>;

export const Default: Story = {
  args: {
    position: 'right',
    size: 'medium',
    open: false,
    closeOnEsc: true,
    children: html`
      <studs-button slot="toggle">Open</studs-button>
      <p>Drawer content</p>
    `
  }
};