import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsDatePicker } from '../..';

const meta = {
  title: 'Studs/Inputs/DatePicker',
  tags: ['autodocs'],
  render: (args: any) => html`
      <studs-date-picker
        name=${ifDefined(args.name)}
        .position=${args.position === 'default' ? 'bottom' : args.position}
        min-date=${ifDefined(args.minDate)}
        max-date=${ifDefined(args.maxDate)}
        .placeholder=${args.placeholder}
        ?disabled=${args.disabled}
        .value=${args.value}
        @change=${(e: CustomEvent) => {
          console.log((e.target as HTMLInputElement)?.value);
        }}></studs-date-picker>`,
  argTypes: {
    disabled: { control: 'boolean' },
    minDate: { control: 'text' },
    maxDate: { control: 'text' },
    placeholder: { control: 'text' },
    position: {
      control: {
        type: 'select'
      },
      options: ['default', 'bottom', 'left', 'right', 'top'],
      description: 'The position of the date picker',
      table: {
        type: {
          detail: `"bottom", "left", "right", "top"`
        },
        defaultValue: { summary: 'bottom' }
      }
    }
  }
} satisfies Meta<StudsDatePicker>;

export default meta;
type Story = StoryObj<StudsDatePicker>;

export const Default: Story = {
  args: {
    placeholder: 'MM/DD/YYYY',
    position: 'bottom',
    minDate: '12/12/2023',
    maxDate: '12/31/2036',
  }
};

export const InitialSelectedDate: Story = {
  args: {
    placeholder: 'MM-DD-YYYY',
    position: 'bottom',
    minDate: '12/12/2023',
    maxDate: '12/31/2036',
    value: '2024-03-10'
  }
};
