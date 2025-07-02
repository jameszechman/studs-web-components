import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsAvatar } from '../../src/components/display/avatar';
import { StudsBadge } from '../../src/components/display/badge';
import { StudsTooltip } from '../../src/components/overlays/tooltip';

describe('StudsAvatar', async () => {
  it('should render', async () => {
    const el = await fixture<StudsAvatar>(html`
      <studs-avatar
        source="https://www.thispersondoesnotexist.com/"
        name="Admin"
        size="small"
      ></studs-avatar>
    `);
    expect(el).to.be.instanceOf(StudsAvatar);
  });

  it('should render with name', async () => {
    const el = await fixture<StudsAvatar>(html`
      <studs-avatar
        source="https://www.thispersondoesnotexist.com/"
        name="Admin"
        size="small"
      ></studs-avatar>
    `);
    expect(el).to.be.instanceOf(StudsAvatar);

    const nameStudsTooltip = el.shadowRoot?.querySelector('studs-tooltip');
    expect(nameStudsTooltip).to.be.instanceOf(StudsTooltip);
    expect(nameStudsTooltip?.textContent?.trim()).be.equal('Admin');
  });

  it('should render with sizes', async () => {
    const sizes = ['small', 'medium', 'large'];
    const el = await fixture<StudsAvatar>(html`
      <studs-avatar
        source="https://www.thispersondoesnotexist.com/"
        name="Admin"
        size="small"
      ></studs-avatar>
    `);
    expect(el).to.be.instanceOf(StudsAvatar);

    sizes.forEach(async (size) => {
      await aTimeout(0);
      el.setAttribute('size', size);
      await elementUpdated(el);
      expect(el.getAttribute('size')).be.equal(size);
      const wrapper = el.shadowRoot?.querySelector(`.-${size}`);
      expect(wrapper).be.exist;
    });
  });

  it('should render with source', async () => {
    const el = await fixture<StudsAvatar>(html`
      <studs-avatar
        source="https://www.thispersondoesnotexist.com/"
        name="Admin"
        size="small"
      ></studs-avatar>
    `);
    expect(el).to.be.instanceOf(StudsAvatar);

    expect(el.getAttribute('source')).be.eq(
      'https://www.thispersondoesnotexist.com/'
    );

    const imgEl = el.shadowRoot?.querySelector(`img`);
    expect(imgEl?.getAttribute('src')).be.eq(
      'https://www.thispersondoesnotexist.com/'
    );
  });

  it('should render without source and show text by first name character', async () => {
    const el = await fixture<StudsAvatar>(html`
      <studs-avatar name="Leona" size="small"></studs-avatar>
    `);
    expect(el).to.be.instanceOf(StudsAvatar);

    const imgEl = el.shadowRoot?.querySelector(`img`);
    expect(imgEl).be.not.exist;

    const textEl = el.shadowRoot?.querySelector(`.-text`);
    expect(textEl).be.exist;
    expect(textEl?.textContent?.trim()).be.eq('L');
  });

  it('should render with icon fallback', async () => {
    const el = await fixture<StudsAvatar>(html`
      <studs-avatar icon-fallback="home"></studs-avatar>
    `);
    expect(el).to.be.instanceOf(StudsAvatar);

    const imgEl = el.shadowRoot?.querySelector(`img`);
    expect(imgEl).be.not.exist;

    const iconEl = el.shadowRoot?.querySelector(`i.icon`);
    expect(iconEl).be.exist;
    expect(iconEl?.textContent?.trim()).be.eq('home');
  });

  it('should render without icon fallback', async () => {
    const el = await fixture<StudsAvatar>(html`
      <studs-avatar></studs-avatar>
    `);
    expect(el).to.be.instanceOf(StudsAvatar);

    const imgEl = el.shadowRoot?.querySelector(`img`);
    expect(imgEl).be.not.exist;

    const iconEl = el.shadowRoot?.querySelector(`i.icon`);
    expect(iconEl).be.exist;
    expect(iconEl?.textContent?.trim()).be.eq('person');
  });

  it('should render with selectable', async () => {
    const el = await fixture<StudsAvatar>(html`
      <studs-avatar
        source="https://thispersondoesnotexist.com"
        name="Jorge"
        selectable
      ></studs-avatar>
    `);
    expect(el).to.be.instanceOf(StudsAvatar);
    expect(el.getAttribute('selectable')).be.exist;

    const wrapper = el.shadowRoot?.querySelector('.wrapper');
    expect(wrapper?.classList.contains('-selected')).be.false;

    const avatarEl = el.shadowRoot?.querySelector('.avatar') as HTMLDivElement;
    avatarEl?.click();
    await elementUpdated(el);
    expect(wrapper?.classList.contains('-selected')).be.true;
  });

  it('should render with badge position', async () => {
    const badgePositions = [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ];
    const el = await fixture<StudsAvatar>(html`
      <studs-avatar
        source="https://thispersondoesnotexist.com"
        name="Jorge"
        enable-badge="true"
        badge-status="online"
      ></studs-avatar>
    `);
    expect(el).to.be.instanceOf(StudsAvatar);

    badgePositions.forEach(async (pos) => {
      await aTimeout(0);
      el.setAttribute('badge-position', pos);
      await elementUpdated(el);
      const studsBadgeEl = el.shadowRoot?.querySelector('studs-badge');
      expect(studsBadgeEl).be.instanceOf(StudsBadge);
      expect(studsBadgeEl?.getAttribute('position')).be.eq(pos);
    });
  });

  it('should render with badge statuses', async () => {
    const badgeStatuses = ['online', 'offline', 'busy'];
    const el = await fixture<StudsAvatar>(html`
      <studs-avatar
        source="https://thispersondoesnotexist.com"
        name="Jorge"
        enable-badge="true"
      ></studs-avatar>
    `);
    expect(el).to.be.instanceOf(StudsAvatar);

    badgeStatuses.forEach(async (stt) => {
      await aTimeout(0);
      el.setAttribute('badge-status', stt);
      await elementUpdated(el);
      const studsBadgeEl = el.shadowRoot?.querySelector('studs-badge');
      expect(studsBadgeEl).be.instanceOf(StudsBadge);
      expect(studsBadgeEl?.classList.contains(`-${stt}`)).be.true;
    });
  });
});
