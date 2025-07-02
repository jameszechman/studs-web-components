import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsDivider } from '../../src/components/display/divider';

describe('StudsDivider', async () => {
  it('should render', async () => {
    const el = await fixture<StudsDivider>(html`
      <studs-divider></studs-divider>
    `);
    expect(el).to.be.instanceOf(StudsDivider);
  });
  it('should render with size', async () => {
    const el = await fixture<StudsDivider>(html`
      <studs-divider></studs-divider>
    `);
    const size = ['medium', 'small', 'large', 'extraLarge'];
    const divElm = el.shadowRoot?.querySelector('div') as HTMLDivElement;
    size.map(async (sz) => {
      await aTimeout(1);
      el.setAttribute('size', sz);
      await elementUpdated(el);
      expect(el.getAttribute('size')).to.equal(sz);
      expect(divElm?.classList.contains(`-${sz}`)).to.be.true;
    });
  });
  it('should render with orientation', async () => {
    const el = await fixture<StudsDivider>(html`
      <studs-divider></studs-divider>
    `);
    const orientation = ['horizontal', 'vertical'];
    const divElm = el.shadowRoot?.querySelector('div') as HTMLDivElement;
    orientation.map(async (orientation) => {
      await aTimeout(1);
      el.setAttribute('size', orientation);
      await elementUpdated(el);
      expect(el.getAttribute('size')).to.equal(orientation);
      expect(divElm?.classList.contains(`-${orientation}`)).to.be.true;
    });
  });
  it('should render with content', async () => {
    const el = await fixture<StudsDivider>(html`
      <studs-divider>content</studs-divider>
    `);
    expect(el.textContent).to.eql('content');
  });
});
