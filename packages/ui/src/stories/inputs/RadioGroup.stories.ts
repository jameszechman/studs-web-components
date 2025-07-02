import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsRadioGroup } from '../../components/inputs/radio-group';

const meta = {
  title: 'Studs/Inputs/RadioGroups',
  tags: ['autodocs'],
  render: (args: any) => {
    function submit(e: SubmitEvent) {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      for (const key of formData.entries()) {
        console.log(key);
      }
    }

    return html`
      <form @submit=${submit}>
        <studs-radio-group
          name=${ifDefined(args.name)}
          direction=${ifDefined(args.direction)}
          value=${ifDefined(args.value)}
          @change=${(e: Event) => console.log(e)}
        >
          <studs-radio
            name=${ifDefined(args.name)}
            value="radio1"
            label="Radio 1"
          ></studs-radio>
          <studs-radio
            name=${ifDefined(args.name)}
            value="radio2"
            label="Radio 2"
          ></studs-radio>
          <studs-radio
            name=${ifDefined(args.name)}
            value="radio3"
            label="Radio 3"
          ></studs-radio>
        </studs-radio-group>
        <studs-button type="submit">Submit</studs-button>
      </form>`;
  },
  argTypes: {
    name: { control: 'text' },
    direction: {
      control: {
        type: 'select',
      },
      options: ['default', 'inline', 'block']
    },
    value: { control: 'text' }
  }
} satisfies Meta<StudsRadioGroup>;

export default meta;

type Story = StoryObj<StudsRadioGroup>;

export const Default: Story = {
  args: {
    name: 'radio',
    value: 'radio1'
  }
};

export const NoSelected: Story = {
  args: {
    name: 'radio'
  }
};