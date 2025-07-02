import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsProgress } from '../../components/display/progress';

const meta = {
  title: 'Studs/Display/Progress',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-progress
      .value=${args.value}
      .max=${args.max}
      ?show-value=${args.showValue}
      size=${ifDefined(args.size)}
      label=${ifDefined(args.label)}
      helper-text=${ifDefined(args.helperText)}
      ?indeterminate=${args.indeterminate}
    ></studs-progress>
  `,
  argTypes: {
    value: { control: 'number' },
    max: { control: 'number' },
    showValue: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    label: { control: 'text' },
    helperText: { control: 'text' },
    indeterminate: { control: 'boolean' },
  },
} satisfies Meta<StudsProgress>;

export default meta;
type Story = StoryObj<StudsProgress>;

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
    showValue: true,
  },
};

export const LabelHelperText: Story = {
  name: 'Label & HelperText',
  args: {
    value: 60,
    max: 100,
    showValue: true,
    label: 'Label',
    helperText: 'Helper text',
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Loading...',
    helperText: 'Please wait',
  },
};
