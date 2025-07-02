import { StudsAlert } from './../../src/components/display/alert';
import { describe, it } from 'vitest';
import {
  fixture,
  html,
  expect,
  elementUpdated,
  aTimeout,
} from '@open-wc/testing';

describe('StudsAlert', async () => {
  it('should render', async () => {
    const el = await fixture<StudsAlert>(html` <studs-alert></studs-alert> `);
    expect(el).to.be.exist;
    expect(el).to.be.instanceOf(StudsAlert);
  });

  it('should render with position', async () => {
    const el = await fixture<StudsAlert>(html` <studs-alert></studs-alert> `);
    const allPosition = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ];
    const divElm = el.shadowRoot?.querySelector('div');
    allPosition.map(async (position) => {
      await aTimeout(1);
      el.setAttribute('position', position);
      await elementUpdated(el);
      expect(el.getAttribute('position')).to.equal(position);
      expect(divElm?.classList.contains(`-${position}`)).to.be.true;
    });
  });

  it('should render with correct message', async () => {
    const message = 'This is content';
    const el = await fixture<StudsAlert>(html`
      <studs-alert message=${message}> </studs-alert>
    `);
    const query = el.shadowRoot?.querySelector('p');
    expect(el.getAttribute('message')).to.equal(message);
    expect(query?.textContent?.trim()).to.equal(message);
  });

  it('should render with correct type', async () => {
    const el = await fixture<StudsAlert>(html` <studs-alert> </studs-alert> `);
    const allType = ['error', 'warning', 'info', 'success'];
    const query = el.shadowRoot?.querySelector('.alert');
    allType.map(async (type) => {
      await aTimeout(0);
      el.setAttribute('type', type);
      await elementUpdated(el);
      const icon = el.shadowRoot?.querySelector('i.icon');
      expect(el.getAttribute('type')).to.equal(type);
      expect(query?.classList.contains(`-${type}`)).to.be.true;
      expect(icon?.classList.contains(`-${type}`)).to.be.true;
    });
  });

  it('should render with open attribute', async () => {
    const el = await fixture<StudsAlert>(
      html` <studs-alert open> </studs-alert> `
    );
    expect(el.hasAttribute('open')).to.be.true;
  });
});
