import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsIcon } from '../../src/components/display/icon';

describe('StudsIcon', async () => {
  it('should render', async () => {
    const el = await fixture<StudsIcon>(
      html` <studs-icon icon="home"></studs-icon> `
    );
    expect(el).to.be.instanceOf(StudsIcon);
    expect(el.shadowRoot?.querySelector('i')).be.exist;
  });

  it('should render with sizes', async () => {
    const sizes = ['small', 'medium', 'large', 'extraLarge'];

    const el = await fixture<StudsIcon>(html` <studs-icon></studs-icon> `);
    expect(el).to.be.instanceOf(StudsIcon);
    sizes.forEach(async (size) => {
      await aTimeout(0);
      el.setAttribute('size', size);
      await elementUpdated(el);
      expect(el.getAttribute('size')).be.equal(size);
      const wrapper = el.shadowRoot?.querySelector(`.-${size}`);
      expect(wrapper).be.exist;
    });
  });

  it('should render with color', async () => {
    const color = ['inherit', 'primary', 'secondary', 'tertiary'];

    const el = await fixture<StudsIcon>(html` <studs-icon></studs-icon> `);
    expect(el).to.be.instanceOf(StudsIcon);
    color.forEach(async (color) => {
      await aTimeout(0);
      el.setAttribute('color', color);
      await elementUpdated(el);
      expect(el.getAttribute('color')).be.equal(color);
      const wrapper = el.shadowRoot?.querySelector(`.-${color}`);
      expect(wrapper).be.exist;
    });
  });
});
