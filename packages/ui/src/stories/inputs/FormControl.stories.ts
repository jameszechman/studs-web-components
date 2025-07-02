import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { StudsFormControl } from '../../components/inputs/form-control';

const meta = {
  title: 'Studs/Inputs/FormControl',
  tags: ['autodocs'],
  render: (args: any) => html`
    <studs-form-control
      as=${ifDefined(args.as)}
      display=${ifDefined(args.display)}
      name=${ifDefined(args.name)}
      ?required=${args.required}
      ?optional=${args.optional}
      ?invalid=${args.invalid}
      ?success=${args.success}
      ?warning=${args.warning}
      ?disabled=${args.disabled}
    >
      ${unsafeHTML(args.children)}
    </studs-form-control>
  `,
  argTypes: {
    as: { control: 'inline-radio', options: ['div', 'fieldset'] },
    display: { control: 'inline-radio', options: ['inline', 'block'] },
    name: { control: 'text' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    success: { control: 'boolean' },
    warning: { control: 'boolean' },
    children: { control: 'text' }
  }
} satisfies Meta<StudsFormControl>;

export default meta;

type Story = StoryObj<StudsFormControl & { children: any }>;

export const Div: Story = {
  args: {
    as: 'div',
    display: 'block',
    name: 'basic',
    children: `
        <studs-label>Label</studs-label>
        <studs-input></studs-input>
        <studs-helper-text>Helper text</studs-helper-text>
        <studs-error-message>There is an error</studs-error-message>
        `
  }
};

export const Fieldset: Story = {
  args: {
    as: 'fieldset',
    display: 'block',
    children: `
        <studs-label>Label</studs-label>
        <studs-input></studs-input>
        <studs-helper-text>Helper text</studs-helper-text>
        <studs-error-message>There is an error</studs-error-message>
        `
  }
};

export const Invalid: Story = {
  args: {
    as: 'div',
    display: 'block',
    invalid: true,
    children: `
        <studs-label>Label</studs-label>
        <studs-input></studs-input>
        <studs-helper-text>Helper text</studs-helper-text>
        <studs-error-message>There is an error</studs-error-message>
        `
  }
};

export const Success: Story = {
  args: {
    as: 'div',
    display: 'block',
    success: true,
    children: `
        <studs-label>Label</studs-label>
        <studs-input></studs-input>
        <studs-helper-text>Helper text</studs-helper-text>
        <studs-error-message>There is an error</studs-error-message>
        `
  }
};

export const Warning: Story = {
  args: {
    as: 'div',
    display: 'block',
    warning: true,
    children: `
        <studs-label>Label</studs-label>
        <studs-input></studs-input>
        <studs-helper-text>Helper text</studs-helper-text>
        <studs-error-message>There is an error</studs-error-message>
        `
  }
};

export const Required: Story = {
  args: {
    as: 'div',
    display: 'block',
    required: true,
    children: `
        <studs-label>Label</studs-label>
        <studs-input></studs-input>
        <studs-helper-text>Helper text</studs-helper-text>
        <studs-error-message>There is an error</studs-error-message>
        `
  }
};

export const Optional: Story = {
  args: {
    as: 'div',
    display: 'block',
    optional: true,
    children: `
        <studs-label>Label</studs-label>
        <studs-input></studs-input>
        <studs-helper-text>Helper text</studs-helper-text>
        <studs-error-message>There is an error</studs-error-message>
        `
  }
};

export const Disabled: Story = {
  args: {
    as: 'div',
    display: 'block',
    disabled: true,
    children: `
        <studs-label>Label</studs-label>
        <studs-input></studs-input>
        <studs-helper-text>Helper text</studs-helper-text>
        <studs-error-message>There is an error</studs-error-message>
        `
  }
};

export const Dropdown: Story = {
  args: {
    as: 'div',
    display: 'block',
    children: `
        <studs-label>Label</studs-label>
        <studs-dropdown .options=${[{
      'label': 'Option 1',
      'value': 'option-1'
    }, {
      'label': 'Option 2',
      'value': 'option-2'
    }, {
      'label': 'Option 3',
      'value': 'option-3'
    }]}>
        </studs-dropdown>
        <studs-helper-text>Helper text</studs-helper-text>
        <studs-error-message>There is an error</studs-error-message>
        `
  }
};

export const RadioGroup: Story = {
  args: {
    as: 'fieldset',
    display: 'block',
    children: `
        <studs-label>Label</studs-label>
        <studs-radio-group>
            <studs-radio value="option-1" label='Option 1'>Option 1</studs-radio>
            <studs-radio value="option-2" label='Option 1'>Option 2</studs-radio>
            <studs-radio value="option-3" label='Option 1'>Option 3</studs-radio>
        </studs-radio-group>
        <studs-helper-text>Helper text</studs-helper-text>
        <studs-error-message>There is an error</studs-error-message>
        `
  }
};

export const CheckboxGroup: Story = {
  args: {
    as: 'fieldset',
    display: 'block',
    children: `
        <studs-label>Label</studs-label>
        <studs-checkbox-group>
            <studs-checkbox value="option-1" label='Option 1'>Option 1</studs-checkbox>
            <studs-checkbox value="option-2" label='Option 1'>Option 2</studs-checkbox>
            <studs-checkbox value="option-3" label='Option 1'>Option 3</studs-checkbox>
        </studs-checkbox-group>
        <studs-helper-text>Helper text</studs-helper-text>
        <studs-error-message>There is an error</studs-error-message>
        `
  }
};

export const Slider: Story = {
  args: {
    as: 'div',
    display: 'block',
    children: `
        <studs-label>Label</studs-label>
        <studs-slider></studs-slider>
        <studs-helper-text>Helper text</studs-helper-text>
        <studs-error-message>There is an error</studs-error-message>
        `
  }
};

export const Switch: Story = {
  args: {
    as: 'div',
    display: 'block',
    children: `
        <studs-label>Label</studs-label>
        <studs-switch></studs-switch>
        <studs-helper-text>Helper text</studs-helper-text>
        <studs-error-message>There is an error</studs-error-message>
        `
  }
};

export const Textarea: Story = {
  args: {
    as: 'div',
    display: 'block',
    children: `
        <studs-label>Label</studs-label>
        <studs-textarea></studs-textarea>
        <studs-helper-text>Helper text</studs-helper-text>
        <studs-error-message>There is an error</studs-error-message>
        `
  }
};