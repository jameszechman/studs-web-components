import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsTextarea } from '../../components/inputs/textarea';
import { size } from '../../utils/_argTypes';

const meta = {
  title: 'Studs/Inputs/Textarea',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-textarea
      name=${ifDefined(args.name)}
      value=${ifDefined(args.value)}
      rows=${ifDefined(args.rows)}
      cols=${ifDefined(args.cols)}
      minlength=${ifDefined(args.minlength)}
      maxlength=${ifDefined(args.maxlength)}
      .characterCounter=${args.characterCounter}
      placeholder=${ifDefined(args.placeholder)}
      size=${ifDefined(args.size)}
      ?disabled=${args.disabled}
      ?required=${args.required}
      status=${ifDefined(args.status)}
      ?full-width=${args.fullWidth}
      @change=${(e: Event) => console.log((e.target as HTMLTextAreaElement).value)}
    ></studs-textarea>`,
  argTypes: {
    ...size,
    name: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    cols: { control: 'number' },
    minlength: { control: 'number' },
    maxlength: { control: 'number' },
    characterCounter: { control: 'boolean' },
    status: {
      control: { type: 'select' },
      options: [null, 'error', 'success', 'warning']
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' }
  }
} satisfies Meta<StudsTextarea>;

export default meta;
type Story = StoryObj<StudsTextarea>;

export const Default: Story = {
  args: {
    value: 'Default Value'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const WithCharacterCounter: Story = {
  args: {
    characterCounter: true,
    maxlength: 100
  }
};

export const FullWidth: Story = {
  args: {
    fullWidth: true
  }
};
