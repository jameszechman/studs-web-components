import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StudsInput } from '../..';
import { formArgs } from '../../utils/_argTypes';

const meta = {
  title: 'Studs/Inputs/Input',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-input
      type=${ifDefined(args.type)}
      name=${ifDefined(args.name)}
      value=${ifDefined(args.value)}
      placeholder=${ifDefined(args.placeholder)}
      input-size=${ifDefined(args.inputSize)}
      status=${ifDefined(args.status)}
      ?disabled=${args.disabled}
      ?required=${args.required}
      .adornments=${ifDefined(args.adornments)}
      @change=${(e: Event) => console.log((e.target as StudsInput).value)}
      ?infinite=${args.infinite}
      minlength=${ifDefined(args.minlength)}
      maxlength=${ifDefined(args.maxlength)}
    ></studs-input>`,
  argTypes: {
    ...formArgs,
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'number', 'tel', 'email', 'search', 'file'],
      description: 'The type of the input',
      table: {
        type: {
          summary: 'string',
          detail: `"text" | "password" | "number" | "tel" | "email" | "search" | "file"`
        },
        defaultValue: { summary: 'text' }
      }
    },
    inputSize: {
      control: { type: 'select' },
      options: ['default', 'small', 'medium', 'large'],
      description: 'The size of the input',
      table: {
        type: {
          summary: 'string',
          detail: `"small" | "medium" | "large"`
        },
        defaultValue: { summary: 'medium' }
      }
    },
    adornments: {
      control: { type: 'object' },
      description: `The adornments of the input.`,
      table: {
        type: {
          summary: 'object',
          detail: `{"home": {"type": "icon", "position": "end"}, "info": {"type": "text", "position": "start"}}`,
        },
      },
    },
    value: {
      control: { type: 'text' }
    }
  }
} satisfies Meta<StudsInput>;

export default meta;
type Story = StoryObj<StudsInput>;

export const Default: Story = {
  args: {
    type: 'text'
  }
};

export const Infinite: Story = {
  args: {
    type: 'number',
    infinite: true
  }
};

export const LimitLength: Story = {
  args: {
    type: 'text',
    minlength: 2,
    maxlength: 4
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const DefaultValue: Story = {
  args: {
    type: 'text',
    value: 'Default Value'
  }
};

export const AnErrorInput: Story = {
  args: {
    type: 'text',
    value: 'Default Value',
    status: 'error'
  }
};

export const ASuccessInput: Story = {
  args: {
    type: 'text',
    value: 'Default Value',
    status: 'success'
  }
};

export const AWarningInput: Story = {
  args: {
    type: 'text',
    value: 'Default Value',
    status: 'warning'
  }
};

export const AdornmentStart: Story = {
  args: {
    type: 'text',
    adornments: {
      '$': {}
    }
  }
};

export const AdornmentEnd: Story = {
  args: {
    type: 'text',
    adornments: {
      'lbs': {
        type: 'text',
        position: 'end'
      }
    }
  }
};

export const AdornmentIcon: Story = {
  args: {
    type: 'text',
    adornments: {
      'info': {
        type: 'icon',
        position: 'end'
      }
    }
  }
};

export const TwoAdornments: Story = {
  args: {
    type: 'text',
    adornments: {
      'info': {
        type: 'icon',
        position: 'end'
      },
      '$': {
        type: 'text',
        position: 'start'
      }
    }
  }
};

export const Search: Story = {
  render: (args: any) => {

    function onSubmit(e: FormDataEvent) {
      e.preventDefault();
      console.log(e);
    }

    return html`
      <form onSubmit=${onSubmit}>
        <studs-input
          type=${ifDefined(args.type)}
          @submit=${args.onSubmit}
        ></studs-input>
      </form>`;
  },
  args: {
    type: 'search'
  }
};

export const SearchWithInvalidValidation: Story = {
  args: {
    type: 'search',
    required: true,
    status: 'error'
  }
};

export const Password: Story = {
  args: {
    type: 'password'
  }
};

export const Submit: Story = {
  args: {
    type: 'submit',
    value: 'Submit'
  }
};
