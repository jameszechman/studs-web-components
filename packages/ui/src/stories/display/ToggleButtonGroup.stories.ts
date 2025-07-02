import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { StudsToggleButtonGroup } from '../../components/display/toggle-button-group';

const meta = {
  title: 'Studs/Display/ToggleButtonGroup',
  tags: ['autodocs'],
  render: (args) => html`
  <studs-toggle-button-group ?multi=${args.multi}> 
      <studs-toggle-button button-type="primary" @click=${() => console.log('button 1')}>Button 1</studs-toggle-button>
      <studs-toggle-button button-type="primary"  @click=${() => console.log('button 2')}>Button 2</studs-toggle-button>
      <studs-toggle-button button-type="primary"  @click=${() => console.log('button 3')}>Button 3</studs-toggle-button>
  </studs-toggle-button-group>
  `,
  argTypes: {
    multi: {
      control: { type: 'boolean' }
    }
  }
} satisfies Meta<StudsToggleButtonGroup>;

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {}
};

export const Multi: Story = {
  args: {
    multi: true
  }
};
