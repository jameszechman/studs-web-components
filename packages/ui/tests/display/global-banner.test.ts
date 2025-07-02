import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsGlobalBanner } from '../../src/components/display/global-banner';
import { StudsButton } from '../../src/components/display/button';
import { StudsIcon } from '../../src/components/display/icon';

describe('GlobalBanner', async () => {
  it('should render', async () => {
    const el = await fixture<StudsGlobalBanner>(html`
      <studs-global-banner
        type="info"
        icon="info"
        placement="left"
        open="true"
        dismissable="true"
      >
        <strong class="title">Title</strong>
        <div class="description">description</div>
      </studs-global-banner>
    `);
    expect(el).to.be.instanceOf(StudsGlobalBanner);
    expect(el.shadowRoot?.querySelector('slot')).be.exist;
  });

  it('should render with icon', async () => {
    const el = await fixture<StudsGlobalBanner>(html`
      <studs-global-banner
        type="info"
        placement="left"
        open="true"
        dismissable="true"
      >
        <strong class="title">Title</strong>
        <div class="description">description</div>
      </studs-global-banner>
    `);
    expect(el).to.be.instanceOf(StudsGlobalBanner);

    expect(el.shadowRoot?.querySelector('studs-icon[icon="info"')).be.not.exist;
    el.setAttribute('icon', 'info');
    await elementUpdated(el);

    const studsIconEl = el.shadowRoot?.querySelector('studs-icon[icon="info"');
    expect(studsIconEl).be.instanceOf(StudsIcon);
  });

  it('should render with types', async () => {
    const types = ['info', 'warning', 'error'];
    const el = await fixture<StudsGlobalBanner>(html`
      <studs-global-banner
        type="info"
        icon="info"
        placement="left"
        open="true"
        dismissable="true"
      >
        <strong class="title">Title</strong>
        <div class="description">description</div>
      </studs-global-banner>
    `);
    expect(el).to.be.instanceOf(StudsGlobalBanner);

    types.forEach(async (t) => {
      await aTimeout(0);
      el.setAttribute('type', t);
      await elementUpdated(el);
      const wrapperEl = el?.shadowRoot?.querySelector('.globalBanner');
      expect(wrapperEl?.classList.contains(`-${t}`)).be.true;
    });
  });

  it('should render with placements', async () => {
    const placements = ['left', 'right', 'center'];
    const el = await fixture<StudsGlobalBanner>(html`
      <studs-global-banner
        type="info"
        icon="info"
        placement="left"
        open="true"
        dismissable="true"
      >
        <strong class="title">Title</strong>
        <div class="description">description</div>
      </studs-global-banner>
    `);
    expect(el).to.be.instanceOf(StudsGlobalBanner);

    placements.forEach(async (p) => {
      await aTimeout(0);
      el.setAttribute('placement', p);
      await elementUpdated(el);
      const wrapperEl = el?.shadowRoot?.querySelector('.globalBanner');
      expect(wrapperEl?.classList.contains(`-${p}`)).be.true;
    });
  });

  it('should open the banner', async () => {
    const el = await fixture<StudsGlobalBanner>(html`
      <studs-global-banner
        type="info"
        icon="info"
        placement="left"
        dismissable="true"
      >
        <strong class="title">Title</strong>
        <div class="description">description</div>
      </studs-global-banner>
    `);
    expect(el).to.be.instanceOf(StudsGlobalBanner);

    const wrapperEl = el?.shadowRoot?.querySelector('.globalBanner');
    expect(wrapperEl?.classList.contains(`-open`)).be.false;
    expect(wrapperEl?.getAttribute('aria-hidden')).eq('true');

    el.setAttribute('open', 'true');
    await elementUpdated(el);

    expect(wrapperEl?.classList.contains(`-open`)).be.true;
    expect(wrapperEl?.getAttribute('aria-hidden')).eq('false');
  });

  it('should dismiss banner with dismissable', async () => {
    const el = await fixture<StudsGlobalBanner>(html`
      <studs-global-banner type="info" icon="info" placement="left" open="true">
        <strong class="title">Title</strong>
        <div class="description">description</div>
      </studs-global-banner>
    `);
    expect(el).to.be.instanceOf(StudsGlobalBanner);

    // validate banner is showing with dismissable = false
    const wrapperEl = el?.shadowRoot?.querySelector('.globalBanner');
    expect(wrapperEl?.classList.contains(`-dismissable`)).be.false;
    expect(wrapperEl?.getAttribute('aria-hidden')).eq('false');
    expect(el?.shadowRoot?.querySelector('studs-button[icon="close"]')).be.not
      .exist;

    // validate banner is showing dismissable = true
    el.setAttribute('dismissable', 'true');
    await elementUpdated(el);

    const studsCloseBtn = el?.shadowRoot?.querySelector(
      'studs-button[icon="close"]'
    );
    expect(wrapperEl?.classList.contains(`-dismissable`)).be.true;
    expect(studsCloseBtn).be.instanceOf(StudsButton);

    // validate banner is hiding after click close icon
    const btn = studsCloseBtn?.shadowRoot?.querySelector('button');
    btn?.click();
    await elementUpdated(el);
    expect(wrapperEl?.getAttribute('aria-hidden')).eq('true');
  });
});
