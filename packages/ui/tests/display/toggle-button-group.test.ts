import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import sinon from 'sinon';
import { describe, it } from 'vitest';

import { StudsToggleButtonGroup } from '../../src/components/display/toggle-button-group';

describe('StudsToggleButtonGroup', async () => {
  it('should render', async () => {
    const el = await fixture<StudsToggleButtonGroup>(html`
      <studs-toggle-button-group>
        <studs-toggle-button
          button-type="primary"
          @click=${() => console.log('button 1')}
          >Button 1</studs-toggle-button
        >
        <studs-toggle-button
          button-type="primary"
          @click=${() => console.log('button 2')}
          >Button 2</studs-toggle-button
        >
        <studs-toggle-button
          button-type="primary"
          @click=${() => console.log('button 3')}
          >Button 3</studs-toggle-button
        >
      </studs-toggle-button-group>
    `);
    expect(el).to.be.instanceOf(StudsToggleButtonGroup);
  });

  it('should render with multi property', async () => {
    const el = await fixture<StudsToggleButtonGroup>(html`
      <studs-toggle-button-group multi>
        <studs-toggle-button
          button-type="primary"
          @click=${() => console.log('button 1')}
          >Button 1</studs-toggle-button
        >
        <studs-toggle-button
          button-type="primary"
          @click=${() => console.log('button 2')}
          >Button 2</studs-toggle-button
        >
        <studs-toggle-button
          button-type="primary"
          @click=${() => console.log('button 3')}
          >Button 3</studs-toggle-button
        >
      </studs-toggle-button-group>
    `);

    expect(el).to.be.instanceOf(StudsToggleButtonGroup);
    expect(el.hasAttribute('multi')).to.be.true;

    // expect multiple btn selected
    const btns = el?.querySelectorAll('studs-toggle-button');
    const firstButtonEl = btns?.[0] as StudsToggleButtonGroup;
    firstButtonEl?.click();
    const secondButtonEl = btns?.[1] as StudsToggleButtonGroup;
    secondButtonEl?.click();
    await aTimeout(0);
    expect(firstButtonEl?.hasAttribute('selected')).to.be.true;
    expect(secondButtonEl?.hasAttribute('selected')).to.be.true;

    // expect second button was unselected
    secondButtonEl?.click();
    await aTimeout(0);
    expect(secondButtonEl?.hasAttribute('selected')).to.be.false;
  });

  it('should run event onclick', async () => {
    const el = await fixture<StudsToggleButtonGroup>(html`
      <studs-toggle-button-group>
        <studs-toggle-button button-type="primary"
          >Button 1</studs-toggle-button
        >
        <studs-toggle-button button-type="primary"
          >Button 2</studs-toggle-button
        >
        <studs-toggle-button button-type="primary"
          >Button 3</studs-toggle-button
        >
      </studs-toggle-button-group>
    `);

    el?.setAttribute('multi', 'true');
    expect(el).to.be.instanceOf(StudsToggleButtonGroup);

    // expect multiple btn selected
    const btns = el?.querySelectorAll('studs-toggle-button');
    const firstButtonEl = btns?.[0] as StudsToggleButtonGroup;
    firstButtonEl?.click();
    const spyOnClick = sinon.spy();
    firstButtonEl.addEventListener('click', spyOnClick);
    firstButtonEl?.click();
    await aTimeout(0);
    expect(spyOnClick.calledOnce).to.be.true;

    firstButtonEl?.click();
    await aTimeout(0);
    expect(spyOnClick.calledTwice).to.be.true;
  });
});
