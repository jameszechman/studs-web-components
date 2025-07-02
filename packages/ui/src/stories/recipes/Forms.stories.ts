import { StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta = {
  title: 'Studs/Recipes/Forms',
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;
type Story = StoryObj<{}>;

export const Form: Story = {
  render: () => {
    function onSubmit(e: SubmitEvent) {
      e.preventDefault();
      const output = document.getElementById('output');
      if (output) output.innerHTML = '';
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      for (const key of formData.entries()) {
        if (output) {
          const tr = document.createElement('tr');
          const tdhead = document.createElement('td');
          const tdbody = document.createElement('td');
          tdhead.textContent = key[0] as string;
          tdbody.textContent = key[1] as string;
          tr.appendChild(tdhead);
          tr.appendChild(tdbody);
          output.appendChild(tr);
        }
      }
    }

    return html`
      <form @submit=${onSubmit}>
        <div style="display: flex; gap: 0.5em">
          <studs-form-control>
            <studs-label>First Name</studs-label>
            <studs-input name="first_name"></studs-input>
            <studs-helper-text>Enter your First Name</studs-helper-text>
            <studs-error-message>Please enter your first name</studs-error-message>
          </studs-form-control>
          <studs-form-control>
            <studs-label>Last Name</studs-label>
            <studs-input name="last_name"></studs-input>
            <studs-helper-text>Enter your Last Name</studs-helper-text>
            <studs-error-message>Please enter your last name</studs-error-message>
          </studs-form-control>
        </div>
        <studs-form-control>
          <studs-label>Favorite Animal</studs-label>
          <studs-dropdown 
          options=${
            JSON.stringify([
              { label: 'Dog', value: 'dog' },
              { label: 'Cat', value: 'cat' },
              { label: 'Bird', value: 'bird' },
              { label: 'Other', value: 'other' }
            ])
          } name="favorite_animal"></studs-dropdown>
        </studs-form-control>
        <studs-form-control>
          <studs-label>How many pets do you have?</studs-label>
          <studs-slider name="pets" min="0" max="10" step="1" .value=${8}
          ></studs-slider>
        </studs-form-control>
        <studs-form-control>
          <studs-label>Are you a real Person?</studs-label>
          <studs-switch name="switch" label="Yes"></studs-switch>
        </studs-form-control>
        <studs-form-control>
          <studs-label>What is your favorite color?</studs-label>
          <studs-checkbox-group>
            <studs-checkbox name="red" label="Red"></studs-checkbox>
            <studs-checkbox name="green" label="Green"></studs-checkbox>
            <studs-checkbox name="blue" label="Blue"></studs-checkbox>
          </studs-checkbox-group>
        </studs-form-control>
        <studs-form-control>
          <studs-label>How old are you?</studs-label>
          <studs-radio-group
          name='radio_group'
          label='Radio Group'
          direction="inline"
          value='radio1'
          >
            <studs-radio name='radio_group' value="radio1" label="20+"></studs-radio>
            <studs-radio name='radio_group' value="radio2" label="30+"></studs-radio>
            <studs-radio name='radio_group' value="radio3" label="60+"></studs-radio>
          </studs-radio-group>
        </studs-form-control>
        <studs-form-control>
          <studs-label>What is your message</studs-label>
          <studs-textarea name='textarea' label='Textarea'></studs-textarea>
        </studs-form-control>
        <studs-button type="reset">Reset</studs-button>
        <studs-button type='submit'>Submit</studs-button>
      </form>
      <table>
        <tbody id="output">
        </tbody>
      </table>
    `;
  }
};

export const FormWithDefaultValues: Story = {
  render: () => {
    function onSubmit(e: SubmitEvent) {
      e.preventDefault();
      const output = document.getElementById('output');
      if (output) output.innerHTML = '';
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      for (const key of formData.entries()) {
        if (output) {
          const tr = document.createElement('tr');
          const tdhead = document.createElement('td');
          const tdbody = document.createElement('td');
          tdhead.textContent = key[0] as string;
          tdbody.textContent = key[1] as string;
          tr.appendChild(tdhead);
          tr.appendChild(tdbody);
          output.appendChild(tr);
        }
      }
    }

    return html`
      <form @submit=${onSubmit}>
        <div style="display: flex; gap: 0.5em">
          <studs-form-control>
            <studs-label>First Name</studs-label>
            <studs-input name="first_name" value="Marie">></studs-input>
            <studs-helper-text>Enter your First Name</studs-helper-text>
            <studs-error-message>Please enter your first name</studs-error-message>
          </studs-form-control>
          <studs-form-control>
            <studs-label>Last Name</studs-label>
            <studs-input name="last_name" value="Lebowski"></studs-input>
            <studs-helper-text>Enter your Last Name</studs-helper-text>
            <studs-error-message>Please enter your last name</studs-error-message>
          </studs-form-control>
        </div>
        <studs-form-control>
          <studs-label>Favorite Animal</studs-label>
          <studs-dropdown 
          
          options=${
            JSON.stringify([
              { label: 'Dog', value: 'dog' },
              { label: 'Cat', value: 'cat' },
              { label: 'Bird', value: 'bird' },
              { label: 'Other', value: 'other' }
            ])
          }
          value="dog" 
          name="favorite_animal"></studs-dropdown>
        </studs-form-control>
        <studs-form-control>
          <studs-label>How many pets do you have?</studs-label>
          <studs-slider enable-tooltip name="pets" defaultvalue="5" min="0" max="100" step="1"></studs-slider>
        </studs-form-control>
        <studs-form-control>
          <studs-label>Are you a real Person?</studs-label>
          <studs-switch name="switch" label="Yes" checked></studs-switch>
        </studs-form-control>
        <studs-form-control>
          <studs-label>What is your favorite color?</studs-label>
          <studs-checkbox-group>
            <studs-checkbox name="red" label="Red" checked></studs-checkbox>
            <studs-checkbox name="green" label="Green"></studs-checkbox>
            <studs-checkbox name="blue" label="Blue"></studs-checkbox>
          </studs-checkbox-group>
        </studs-form-control>
        <studs-form-control>
          <studs-label>How old are you?</studs-label>
          <studs-radio-group
            name='radio_group'
            label='Radio Group'
            direction="inline"
            value='radio1'
            >
            <studs-radio name='radio_group' value="radio1" label="20+"></studs-radio>
            <studs-radio name='radio_group' value="radio2" label="30+"></studs-radio>
            <studs-radio name='radio_group' value="radio3" label="60+"></studs-radio>
          </studs-radio-group>
        </studs-form-control>
        <studs-form-control>
          <studs-label>What is your message</studs-label>
          <studs-textarea name='textarea' label='Textarea' value="Test"></studs-textarea>
        </studs-form-control>
        <studs-button type="reset">Reset</studs-button>
        <studs-button type='submit'>Submit</studs-button>
      </form>
      <table>
        <tbody id="output">
        </tbody>
      </table>
    `;
  }
};
