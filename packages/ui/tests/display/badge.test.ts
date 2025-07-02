import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import sinon from 'sinon';
import { describe, it } from 'vitest';

import { StudsBadge } from '../../src/components/display/badge';

describe('StudsAccordion', async () => {
  it('should render', async () => {
    const el = await fixture<StudsBadge>(html`
      <studs-badge
        icon="info"
        count="1"
        max="99"
        size="medium"
        position="top-right"
        color="primary"
      ></studs-badge>
      `);
    expect(el).to.be.instanceOf(StudsBadge);
  });

  it('should render with icon', async () => {
    const el = await fixture<StudsBadge>(html`
      <studs-badge
        icon="info"
        count="1"
        max="99"
        size="medium"
        position="top-right"
        color="primary"
      ></studs-badge>
      `);
    expect(el.getAttribute('icon')).to.eq('info');
    expect(el.shadowRoot?.querySelector('div')?.querySelector('.studs-icon')).to.exist;
  });

  it('should render with count', async () => {
    const el = await fixture<StudsBadge>(html`
      <studs-badge
        icon="info"
        count="1"
        max="99"
        size="medium"
        position="top-right"
        color="primary"
      ></studs-badge>
      `);
    expect(el.getAttribute('count')).to.eq('1');
  });

  it('should render with max', async () => {
    const el = await fixture<StudsBadge>(html`
      <studs-badge
        icon="info"
        count="1"
        max="99"
        size="medium"
        position="top-right"
        color="primary"
      ></studs-badge>
      `);
    expect(el.getAttribute('max')).to.eq('99');
  });

  it('should render with size', async () => {
    const sizes = ['small', 'medium', 'large'];
    const el = await fixture<StudsBadge>(html`
      <studs-badge
        icon="info"
        count="1"
        max="99"
        size="medium"
        position="top-right"
        color="primary"
      ></studs-badge>
      `);
    sizes.forEach(async (size) => {
      await aTimeout(1);
      el.setAttribute('size', size);
      await elementUpdated(el);
      expect(el.getAttribute('size')).to.eq(size);
      expect(el.shadowRoot?.querySelector('div')?.classList.contains(`-${size}`)).to.be.true;
    });
  });

  it('should render with position', async () => {
    const el = await fixture<StudsBadge>(html`
      <studs-badge
        icon="info"
        count="1"
        max="99"
        size="medium"
        position="top-right"
        color="primary"
      ></studs-badge>
      `);
      const allPosition = [
        'top-right',
        'top-left',
        'bottom-right',
        'bottom-left',
        'center',
      ];
      allPosition.map((position) => {
        el.setAttribute('position', position);
        expect(el.getAttribute('position')).to.equal(position);
      });
  });

  it('should render with color', async () => {
    const el = await fixture<StudsBadge>(html`
      <studs-badge
        icon="info"
        count="1"
        max="99"
        size="medium"
        position="top-right"
        color="primary"
      ></studs-badge>
      `);
    expect(el.getAttribute('color')).to.eq('primary');
  });

  it('should render with marker', async () => {
    const el = await fixture<StudsBadge>(html`
      <studs-badge
        icon="info"
        count="1"
        max="99"
        size="medium"
        position="top-right"
        color="primary"
        marker="true"
      ></studs-badge>
      `);
    expect(el.hasAttribute('marker')).to.be.true;
  });
});