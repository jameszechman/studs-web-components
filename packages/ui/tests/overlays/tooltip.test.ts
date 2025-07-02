import { StudsTooltip } from './../../src/components/overlays/tooltip';
import { position } from './../../src/utils/_argTypes';
import { describe, it } from 'vitest';
import {
  fixture,
  html,
  expect,
  elementUpdated,
  aTimeout,
} from '@open-wc/testing';
import { StudsButton } from '../../src/components/display/button';

describe('StudsTooltip', async () => {
  it('should render', async () => {
    const el = await fixture<StudsTooltip>(html`
      <studs-tooltip></studs-tooltip>
    `);
    expect(el).to.be.exist;
    expect(el).to.be.instanceOf(StudsTooltip);
  });

  it('should render with position', async () => {
    const el = await fixture<StudsTooltip>(html`
      <studs-tooltip></studs-tooltip>
    `);
    const allPosition = position.position.options;
    allPosition.map((position) => {
      el.setAttribute('position', position);
      expect(el.getAttribute('position')).to.equal(position);
    });
  });

  it('should render with disabled default', async () => {
    const el = await fixture<StudsTooltip>(html`
      <studs-tooltip disabled></studs-tooltip>
    `);
    expect(el.hasAttribute('disabled')).to.be.true;
  });

  it('should render with correct content', async () => {
    const content = 'Popover content';
    const el = await fixture<StudsTooltip>(html`
      <studs-tooltip>
        <main>${content}</main>
      </studs-tooltip>
    `);
    expect(el?.textContent?.trim()).to.equal(content);
  });

  it('shows the tooltip on hover', async () => {
    const el = await fixture<StudsTooltip>(html`
      <studs-button button-type="primary">
        Button
        <studs-tooltip position="bottom"> Hello! </studs-tooltip>
      </studs-button>
    `);
    const studsTooltip = el.children[0];
    const tooltip = studsTooltip?.shadowRoot?.querySelector('div');
    el.addEventListener('mouseover', async() => {
      el.setAttribute('aria-expanded', 'true');
      expect(tooltip?.getAttribute('aria-hidden')).to.equal('false');
    });
    expect(el).to.be.instanceOf(StudsButton);
  });

  it('hides the tooltip on hover', async() => {
    const el = await fixture<StudsTooltip>(html`
      <studs-button button-type="primary">
        Button
        <studs-tooltip position="bottom"> Hello! </studs-tooltip>
      </studs-button>
    `);
    const studsTooltip = el.children[0];
    const tooltip = studsTooltip?.shadowRoot?.querySelector('div');
    el.addEventListener("mouseout", async () => {
      el.setAttribute('aria-expanded', 'false');
      await elementUpdated(el);
      expect(tooltip?.getAttribute('aria-hidden')).to.equal('true');
    });
    expect(el).to.be.instanceOf(StudsButton);
  });
});
