import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { StepperProps } from '../../components/display/stepper';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta = {
  title: 'Studs/Display/Stepper',
  tags: ['autodocs'],
  render: (args) => html`
    <studs-stepper
      step=${ifDefined(args.step)}
      .steps=${args.steps}
      direction=${ifDefined(args.direction === 'default' ? 'inline' : args.direction)}
      color=${ifDefined(args.color === 'default' ? 'primary' : args.color)}
      stepSize=${ifDefined(args.stepSize === 'default' ? 'medium' : args.stepSize)}
    >
    </studs-stepper>`,
  argTypes: {
    color: {
      control: {
        type: 'select'
      },
      options: ['default', 'primary', 'secondary'],
      description: 'The color of the stepper.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      }
    },
    stepSize: {
      control: {
        type: 'select'
      },
      options: ['default', 'medium', 'small', 'extraSmall'],
      description: 'The size of the stepper.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' }
      }
    },
    direction: {
      control: {
        type: 'select'
      },
      options: ['default', 'inline', 'block'],
      description: 'The direction of the stepper.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'inline' }
      }
    },
    step: {
      control: {
        type: 'number'
      }
    }
  }
} as Meta<StepperProps>;

export default meta;
type Story = StoryObj<StepperProps>;

export const Default: Story = {
  args: {
    step: 0,
    steps: [
      {
        label: 'Step 1',
        description: 'This is step 1'
      },
      {
        label: 'Step 2',
        description: 'This is step 2'
      },
      {
        label: 'Step 3',
        description: 'This is step 3'
      }
    ]
  }
};

export const WithoutDescription: Story = {
  args: {
    step: 0,
    steps: [
      {
        label: 'Step 1'
      },
      {
        label: 'Step 2'
      },
      {
        label: 'Step 3'
      }
    ]
  }
};

export const block: Story = {
  args: {
    step: 0,
    steps: [
      {
        label: 'Step 1',
        description: 'This is step 1'
      },
      {
        label: 'Step 2',
        description: 'This is step 2'
      },
      {
        label: 'Step 3',
        description: 'This is step 3'
      }
    ],
    direction: 'block'
  }
};

export const Step2: Story = {
  args: {
    step: 1,
    steps: [
      {
        label: 'Step 1',
        description: 'This is step 1'
      },
      {
        label: 'Step 2',
        description: 'This is step 2'
      },
      {
        label: 'Step 3',
        description: 'This is step 3'
      }
    ]
  }
};
