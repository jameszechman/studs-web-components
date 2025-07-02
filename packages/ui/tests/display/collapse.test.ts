import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it, vi, beforeAll } from 'vitest';

import { StudsCollapse } from '../../src/components/display/collapse';

describe('StudsCollapse', async () => {
  it('should render', async () => {
    const el = await fixture<StudsCollapse>(html`
      <studs-collapse .open="false" summary-align="right">
        <span slot="summary">Details</span>
        Lorem ipsum dolor sit amet
      </studs-collapse>
    `);
    expect(el).to.be.instanceOf(StudsCollapse);
  });

  it('should render with disabled', async () => {
    const el = await fixture<StudsCollapse>(html`
      <studs-collapse disabled>
        <span slot="summary">Details</span>
        Lorem ipsum dolor sit amet
      </studs-collapse>
    `);
    expect(el).to.be.instanceOf(StudsCollapse);

    const details = el.shadowRoot?.querySelector('details');
    expect(details?.hasAttribute('disabled')).be.true;
  });

  it('should render with summaryAligns', async () => {
    const summaryAligns = ['left', 'right'];
    const el = await fixture<StudsCollapse>(html`
      <studs-collapse>
        <span slot="summary">Details</span>
        Lorem ipsum dolor sit amet
      </studs-collapse>
    `);
    expect(el).to.be.instanceOf(StudsCollapse);

    summaryAligns.forEach(async (sa) => {
      await aTimeout(0);
      el.setAttribute('summary-align', sa);
      await elementUpdated(el);
      expect(
        el.shadowRoot?.querySelector('details')?.classList.contains(`-${sa}`)
      ).be.true;
    });
  });

  it('should expanded/collapse the details element', async () => {
    const el = await fixture<StudsCollapse>(html`
      <studs-collapse>
        <span slot="summary">Details</span>
        Lorem ipsum dolor sit amet
      </studs-collapse>
    `);
  
    const details = el.shadowRoot?.querySelector('collapse') as HTMLDetailsElement;
    const summary = el.shadowRoot?.querySelector("summary");
    summary?.click();
    await elementUpdated(el);
    expect(el?.hasAttribute('open')).be.true;
    if (details) {
      expect(details?.hasAttribute('open')).be.true;
    }
  });
});
