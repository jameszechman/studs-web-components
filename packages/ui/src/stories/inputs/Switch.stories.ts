import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsSwitch } from '../../components/inputs/switch.ts';

const meta = {
  title: 'Studs/Inputs/Switch',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-switch
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      label=${ifDefined(args.label)}
      label-position=${ifDefined(args.labelPosition === 'default' ? 'end' : args.labelPosition)}
      name=${ifDefined(args.name)}
      size=${ifDefined(args.size)}
      value=${ifDefined(args.value)}
      ?show-value=${args.showValue}
      align=${ifDefined(args.align === 'default' ? 'start' : args.align)}
      @change=${(e: Event) => console.log((e.target as StudsSwitch).checked)}
    ></studs-switch>`,
  argTypes: {
    size: {
      control: {
        type: 'select'
      },
      options: ['small', 'medium'],
      description: 'The size of the switch',
      table: {
        type: {
          detail: `"small" | "medium"`
        },
        defaultValue: { summary: 'medium' }
      }
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['default', 'start', 'end', 'top', 'bottom'],
      description: 'The position of the label',
      table: {
        type: {
          summary: 'string',
          detail: `"start" | "end" | "top" | "bottom"`
        },
        defaultValue: { summary: 'end' }
      }
    },
    checked: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } },
    name: { control: { type: 'text' } },
    value: { control: { type: 'text' } },
    showValue: { control: { type: 'boolean' } },
    align: {
      control: { type: 'select' },
      options: ['default', 'start', 'center', 'end'],
      description: 'The position of the label',
      table: {
        type: {
          summary: 'string',
          detail: `"start" | "center" | "end"`
        },
        defaultValue: { summary: 'start' }
      }
    }
  }
} satisfies Meta<StudsSwitch>;

export default meta;
type Story = StoryObj<StudsSwitch>;

export const Switch: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Toggle Switch',
    labelPosition: 'end',
    name: 'switch',
    size: 'medium'
  }
};
