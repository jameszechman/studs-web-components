import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsCheckboxGroup } from '../../components/inputs/checkbox-group';

const meta = {
  title: 'Studs/Inputs/CheckboxGroups',
  tags: ['autodocs'],
  render: (args: any) => {
    function submit(e) {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      for (const key of formData.entries()) {
        console.log(key);
      }
    }

    return html`<form @submit=${submit}>
      <studs-checkbox-group
        name=${ifDefined(args.name)}
        value=${ifDefined(args.value)}
        direction=${ifDefined(args.direction)}
        @change=${(e: CustomEvent) => console.log('detail', e.detail)}
      >
        <studs-checkbox
          name="demo"
          label="Checkbox 1"
          value='checkbox1'
        ></studs-checkbox>
        <studs-checkbox
          label="Checkbox 2"
          value='checkbox2'
        ></studs-checkbox>
        <studs-checkbox
          label="Checkbox 3"
        ></studs-checkbox>
      </studs-checkbox-group>
      <button type="submit" >Submit</button>
    </form>`;
  },
  argTypes: {
    name: { control: 'text' },
    value: { control: 'text' },
    direction: {
      control: {
        type: 'select',
      },
      options: ['default', 'inline', 'block']
    }
  }
} as Meta<StudsCheckboxGroup>;

export default meta;

type Story = StoryObj<StudsCheckboxGroup>;

export const Default: Story = {
  args: {
    name: 'checkbox',
    value: 'checkbox2'
  }
};
