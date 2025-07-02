import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta = {
  title: 'Studs/Display/ButtonGroup',
  tags: ['autodocs'],
  render: (args) => html`
    <studs-button-group>
      ${unsafeHTML(args.children)}
    </studs-button-group>
  `
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    children: `
    <studs-button button-type="primary">Button 1</studs-button>
    <studs-button button-type="primary">Button 2</studs-button>
    <studs-button button-type="primary">Button 3</studs-button>
    `
  }
};

export const PrimarySplitButton: Story = {
  args: {
    children: `
    <studs-button button-type="primary">Split Button</studs-button>
    <studs-menu>
      <studs-button slot="trigger" button-type="icon" icon="arrow_drop_down"></studs-button>
      <a href="#">Long Item 1</a>
      <a href="#">Item 2</a>
      <a href="#">Item 3</a>
    </studs-menu>
    `
  }
};

export const SecondarySplitButton: Story = {
  args: {
    children: `
    <studs-button button-type="secondary" variant="outline">Split Button</studs-button>
    <studs-menu>
      <studs-button slot="trigger" button-type="icon" icon="arrow_drop_down" variant="outline"></studs-button>
      <a href="#">Long Item 1</a>
      <a href="#">Item 2</a>
      <a href="#">Item 3</a>
    </studs-menu>
    `
  }
};
