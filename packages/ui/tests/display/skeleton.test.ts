import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsSkeleton } from '../../src/components/display/skeleton';

describe('StudsSkeleton', async () => {
  it('should render', async () => {
    const el = await fixture<StudsSkeleton>(html`
      <studs-skeleton></studs-skeleton>
    `);
    expect(el).to.be.instanceOf(StudsSkeleton);
  });

  it('should render', async () => {
    const el = await fixture<StudsSkeleton>(html`
      <studs-skeleton></studs-skeleton>
    `);
    expect(el).to.be.instanceOf(StudsSkeleton);
  });

  it('should render with variant', async () => {
    const variants = ['text', 'circle', 'rect'];
    const el = await fixture<StudsSkeleton>(html`
      <studs-skeleton></studs-skeleton>
    `);
    variants.forEach(async (v) => {
      await aTimeout(1);
      el.setAttribute('variant', v);
      await elementUpdated(el);
      expect(el.getAttribute('variant')).to.eq(v);
      expect(
        el.shadowRoot
          ?.querySelector('div.skeleton')
          ?.classList.contains(`-${v}`)
      ).to.be.true;
    });
  });

  it('should render with width', async () => {
    const el = await fixture<StudsSkeleton>(html`
      <studs-skeleton width="50%"></studs-skeleton>
    `);

    expect(el.getAttribute('width')).to.eq('50%');
    expect(el.shadowRoot?.querySelector('div.skeleton')).to.have.style(
      'width',
      '50%'
    );
  });

  it('should render with height', async () => {
    const el = await fixture<StudsSkeleton>(html`
      <studs-skeleton width="50px"></studs-skeleton>
    `);

    expect(el.getAttribute('width')).to.eq('50px');
    expect(el.shadowRoot?.querySelector('div.skeleton')).to.have.style(
      'width',
      '50px'
    );
  });

  it('should render with animation', async () => {
    const animations = ['linear', 'pulse', 'wave'];
    const el = await fixture<StudsSkeleton>(html`
      <studs-skeleton></studs-skeleton>
    `);
    animations.forEach(async (v) => {
      await aTimeout(1);
      el.setAttribute('animation', v);
      await elementUpdated(el);
      expect(el.getAttribute('animation')).to.eq(v);
      expect(
        el.shadowRoot
          ?.querySelector('div.skeleton')
          ?.classList.contains(`-${v}`)
      ).to.be.true;
    });
  });
});
