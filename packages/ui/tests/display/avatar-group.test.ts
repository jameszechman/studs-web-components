import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsAvatarGroup } from '../../src/components/display/avatar-group';
import { StudsAvatar } from '../../src/components/display/avatar';

describe('StudsAvatarGroup', async () => {
  it('should render', async () => {
    const el = await fixture<StudsAvatarGroup>(html`
      <studs-avatar-group size="medium" max="6">
        <studs-avatar name="Jennifer"></studs-avatar>
        <studs-avatar></studs-avatar>
        <studs-avatar
          name="NaN"
          source="https://thispersondoesnotexist.com"
        ></studs-avatar>
        <studs-avatar name="Muse"></studs-avatar>
        <studs-avatar></studs-avatar>
        <studs-avatar
          name="Kandace"
          source="https://thispersondoesnotexist.com"
        ></studs-avatar>
        <studs-avatar
          name="John Doe"
          source="https://thispersondoesnotexist.com"
        ></studs-avatar>
        <studs-avatar name="Jolene"></studs-avatar>
      </studs-avatar-group>
    `);
    expect(el).to.be.instanceOf(StudsAvatarGroup);
  });

  it('should change avatar size', async () => {
    const el = await fixture<StudsAvatarGroup>(html`
      <studs-avatar-group size="medium" max="6">
        <studs-avatar name="Jennifer"></studs-avatar>
        <studs-avatar></studs-avatar>
        <studs-avatar
          name="NaN"
          source="https://thispersondoesnotexist.com"
        ></studs-avatar>
        <studs-avatar name="Muse"></studs-avatar>
        <studs-avatar></studs-avatar>
        <studs-avatar
          name="Kandace"
          source="https://thispersondoesnotexist.com"
        ></studs-avatar>
        <studs-avatar
          name="John Doe"
          source="https://thispersondoesnotexist.com"
        ></studs-avatar>
        <studs-avatar name="Jolene"></studs-avatar>
      </studs-avatar-group>
    `);
    expect(el).to.be.instanceOf(StudsAvatarGroup);

    el.setAttribute('size', 'large');
    await aTimeout(0);

    const firstStudsAvatar = el.querySelector('studs-avatar');
    expect(firstStudsAvatar).be.instanceOf(StudsAvatar);
    const wrapperEl = firstStudsAvatar?.shadowRoot?.querySelector('.wrapper');
    expect(wrapperEl?.classList.contains('-large')).be.true;
  });
});
