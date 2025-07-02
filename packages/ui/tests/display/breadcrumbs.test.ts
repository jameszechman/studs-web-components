import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import sinon from 'sinon';
import { describe, it } from 'vitest';

import { StudsBreadcrumbs } from '../../src/components/display/breadcrumbs';

describe('StudsBreadcrumbs', async () => {
  it('should render', async () => {
    const el = await fixture<StudsBreadcrumbs>(html`
      <studs-breadcrumbs separator="/">
        <a href="http://www.strongtie.com">Home</a>
        <a href="http://www.strongtie.com/about">About Us</a>
        <a href="http://www.strongtie.com/contact">Contact</a>
      </studs-breadcrumbs>
        `);
    expect(el).to.be.instanceOf(StudsBreadcrumbs);
  });

  it('should render with separator >', async () => {
    const el = await fixture<StudsBreadcrumbs>(html`
      <studs-breadcrumbs separator=">">
        <a href="http://www.strongtie.com">Home</a>
        <a href="http://www.strongtie.com/about">About Us</a>
        <a href="http://www.strongtie.com/contact">Contact</a>
      </studs-breadcrumbs>
        `);
    expect(el).to.be.instanceOf(StudsBreadcrumbs);
  });
});