import { StudsPopover } from '../../src/components/overlays/popover';
import { StudsButton } from '../../src/components/display/button';
import { describe, it } from 'vitest';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import sinon from 'sinon';

describe('StudsPopover', async () => {
  it('should render', async () => {
    const el = await fixture<StudsPopover>(html`
      <studs-popover></studs-popover>
    `);
    expect(el).to.be.exist;
    expect(el).to.be.instanceOf(StudsPopover);
  });

  it('should render with position', async () => {
    const el = await fixture<StudsPopover>(html`
      <studs-popover></studs-popover>
    `);
    const allPosition = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ];
    allPosition.map((position) => {
      el.setAttribute('position', position);
      expect(el.getAttribute('position')).to.equal(position);
    });
  });

  it('should render with icon', async () => {
    const el = await fixture<StudsPopover>(html`
      <studs-popover icon="info"></studs-popover>
    `);
    expect(el.getAttribute('icon')).to.equal('info');
  });

  it('should render with correct content', async () => {
    const content = 'Popover content';
    const el = await fixture<StudsPopover>(html`
      <studs-popover>
        <main>${content}</main>
      </studs-popover>
    `);
    const query = el.querySelector('main');
    expect(query?.textContent).to.equal(content);
  });

  //   it('shows and hide the popover on button click ', async () => {
  //     const el = await fixture<StudsPopover>(html`
  //       <studs-button
  //         >Popover<studs-popover position="right">
  //           <p slot="title">This is a popover</p>
  //           <main>Popover content</main>
  //         </studs-popover></studs-button
  //       >
  //     `);
  //     const studsPopover = el.children[0];
  //     const button = el.shadowRoot?.querySelector('button');
  //     const spy = sinon.spy();
  //     const popover = studsPopover?.shadowRoot?.querySelector('div');
  //     const children = studsPopover.shadowRoot?.querySelector('studs-button');
  //     const iconButton = children?.shadowRoot?.querySelector('button');
  //     if (button) {
  //       button.addEventListener('click', spy);
  //       button.click();
  //       await elementUpdated(el);
  //       expect(spy).to.be.calledOnce;
  //       expect(popover?.getAttribute('aria-hidden')).to.equal('false');
  //     }
  //
  //     if (iconButton) {
  //       iconButton.addEventListener('click', spy);
  //       iconButton.click();
  //       await elementUpdated(el);
  //       expect(spy).to.be.calledTwice;
  //       expect(popover?.getAttribute('aria-hidden')).to.equal('true');
  //     }
  //     expect(el).to.be.instanceOf(StudsButton);
  //   });
});
