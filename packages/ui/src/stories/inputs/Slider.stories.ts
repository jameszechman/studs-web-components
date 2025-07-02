import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { StudsSlider } from '../../components/inputs/slider';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta = {
  title: 'Studs/Inputs/Slider',
  tags: ['autodocs'],
  render: (args) =>
    html`
      <studs-slider
        marks=${ifDefined(JSON.stringify(args.marks))}
        label=${ifDefined(args.label)}
        end-label=${ifDefined(args.endLabel)}
        ?enable-input=${args.enableInput}
        ?enable-tooltip=${args.enableTooltip}
        ?enabled-label=${args.enableLabel}
        defaultValue=${ifDefined(JSON.stringify(args.defaultValue))}
        value=${ifDefined(JSON.stringify(args.value))}
        .calculate-tooltip-label=${args.calculateTooltipLabel}
        min=${ifDefined(args.min)}
        max=${ifDefined(args.max)}
        step=${ifDefined(args.step)}
        @change=${(event: CustomEvent) => {
          console.log((event.target as HTMLInputElement).value)
        }}
      ></studs-slider>`,
  argTypes: {}
} satisfies Meta<StudsSlider>;

export default meta;
type Story = StoryObj<StudsSlider>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 5,
    label: 'Peanut Butter',
    endLabel: 'Jelly',
    enableTooltip: true,
    enableLabel: true,
    enableInput: true,
    marks: [
      { value: 0, label: '0°' },
      { value: 25, label: '25' },
      { value: 50, label: '50' },
      { value: 75, label: '75' },
      { value: 100, label: '100°' }
    ],
    calculateTooltipLabel: (value: number) => {
      return value + ' for Jelly';
    }
  }
};


export const TooltipWithoutCustomLabel: Story = {
  args: {
    defaultValue: [22, 64],
    min: 0,
    max: 100,
    step: 1,
    label: 'A',
    endLabel: 'B',
    enableTooltip: true,
    enableLabel: true
  }
};

export const SingleSlider: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    enableInput: true,
    marks: [
      { value: 0, label: '0°' },
      { value: 25, label: '25' },
      { value: 50, label: '50' },
      { value: 75, label: '75' },
      { value: 100, label: '100°' }
    ]
  }
};

export const Range: Story = {
  args: {
    defaultValue: [0, 100],
    min: 0,
    max: 100,
    step: 1
  }
};

export const Marks: Story = {
  args: {
    defaultValue: [0, 100],
    marks: [
      { value: 0, label: '0°' },
      { value: 25, label: '25' },
      { value: 50, label: '50' },
      { value: 75, label: '75' },
      { value: 100, label: '100°' }
    ],
    min: 0,
    max: 100,
    step: 5
  }
};

export const Input: Story = {
  args: {
    defaultValue: [0, 50],
    enableInput: true,
    min: 0,
    max: 50,
    step: 1
  }
};
