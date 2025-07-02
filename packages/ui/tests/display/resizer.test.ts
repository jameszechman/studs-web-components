import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsResizer } from '../../src/components/display/resizer';
import Sinon from 'sinon';

describe('StudsResizer', async () => {
  it('should render', async () => {
    const el = await fixture<StudsResizer>(html`
      <studs-resizer>
        <div>
          <h3>Panel One</h3>
          <div>Padded Content</div>
        </div>
        <div>
          <h1>This is a Heading</h1>
          <p>This is a paragraph.</p>
        </div>
      </studs-resizer>
    `);
    expect(el).to.be.instanceOf(StudsResizer);
  });

  it('should render with directions', async () => {
    const directions = ['inline', 'block'];
    const el = await fixture<StudsResizer>(html`
      <studs-resizer>
        <div>
          <h3>Panel One</h3>
          <div>Padded Content</div>
        </div>
        <div>
          <h1>This is a Heading</h1>
          <p>This is a paragraph.</p>
        </div>
      </studs-resizer>
    `);
    expect(el).to.be.instanceOf(StudsResizer);

    directions.forEach(async (v) => {
      await aTimeout(1);
      el.setAttribute('direction', v);
      await elementUpdated(el);
      expect(el.getAttribute('direction')).to.eq(v);
      expect(
        el.shadowRoot
          ?.querySelector('div.resizeContainer')
          ?.classList.contains(`-${v}`)
      ).to.be.true;
    });
  });

  it('should render with disabled property', async () => {
    const el = await fixture<StudsResizer>(html`
      <studs-resizer disabled>
        <div>
          <h3>Panel One</h3>
          <div>Padded Content</div>
        </div>
        <div>
          <h1>This is a Heading</h1>
          <p>This is a paragraph.</p>
        </div>
      </studs-resizer>
    `);
    expect(el).to.be.instanceOf(StudsResizer);
    expect(el.hasAttribute('disabled')).to.be.true;

    const resizerEl = el?.shadowRoot?.querySelector('div.resizeContainer');
    expect(resizerEl?.hasAttribute('disabled')).to.be.true;
  });

  it('should render with min/max value', async () => {
    const el = await fixture<StudsResizer>(html`
      <studs-resizer min="50" max="75">
        <div>
          <h3>Panel One</h3>
          <div>Padded Content</div>
        </div>
        <div>
          <h1>This is a Heading</h1>
          <p>This is a paragraph.</p>
        </div>
      </studs-resizer>
    `);
    expect(el).to.be.instanceOf(StudsResizer);
    expect(el.getAttribute('min')).to.be.equal('50');
    expect(el.getAttribute('max')).to.be.equal('75');
  });

  it('should trigger resize events start/move/end with single panel', async () => {
    const el = await fixture<StudsResizer>(html`
      <studs-resizer>
        <div>
          <h3>Panel One</h3>
          <div>Padded Content</div>
        </div>
      </studs-resizer>
    `);

    await elementUpdated(el);

    const spyStart = Sinon.spy();
    const spyResize = Sinon.spy();
    const spyEnd = Sinon.spy();
    el.addEventListener('resize-start', spyStart);
    el.addEventListener('resize', spyResize);
    el.addEventListener('resize-end', spyEnd);

    await aTimeout(0);
    expect(el).to.be.instanceOf(StudsResizer);
    const resizeDivider = el.shadowRoot?.querySelector('.resizeDivider');

    // start event
    resizeDivider?.dispatchEvent(new MouseEvent('mousedown'));
    await aTimeout(0);
    expect(spyStart).be.calledOnce;

    // resize event
    document.dispatchEvent(
      new PointerEvent('pointermove', {
        clientX: 60,
      })
    );
    await aTimeout(0);
    expect(spyResize).be.not.called;

    // end event
    document.dispatchEvent(new PointerEvent('pointerup'));
    await aTimeout(0);
    expect(spyEnd).be.calledOnce;
  });

  it('should trigger resize events start/move/end with multiple panels', async () => {
    const el = await fixture<StudsResizer>(html`
      <studs-resizer>
        <div>
          <h3>Panel One</h3>
          <div>Padded Content</div>
        </div>
        <div data-test="nextDiv">
          <h1>This is a Heading</h1>
          <p>This is a paragraph.</p>
        </div>
      </studs-resizer>
    `);

    await elementUpdated(el);

    // mock DOMRect for nextDiv
    const nextDiv = el.querySelector('[data-test="nextDiv"]')!;
    nextDiv.getBoundingClientRect = () => {
      return {
        bottom: 100,
        height: 100,
        left: 16,
        right: 576.7999877929688,
        top: 168,
        width: 200,
        x: 16,
        y: 168,
      } as DOMRect;
    };

    const spyStart = Sinon.spy();
    const spyResize = Sinon.spy();
    const spyEnd = Sinon.spy();
    el.addEventListener('resize-start', spyStart);
    el.addEventListener('resize', spyResize);
    el.addEventListener('resize-end', spyEnd);

    await aTimeout(0);
    expect(el).to.be.instanceOf(StudsResizer);
    const resizeDivider = el.shadowRoot?.querySelector('.resizeDivider');

    // start event
    resizeDivider?.dispatchEvent(new MouseEvent('mousedown'));
    await aTimeout(0);
    expect(spyStart).be.calledOnce;

    // resize event
    document.dispatchEvent(
      new PointerEvent('pointermove', {
        clientX: 60,
      })
    );
    await aTimeout(0);
    expect(spyResize).be.calledOnce;

    // end event
    document.dispatchEvent(new PointerEvent('pointerup'));
    await aTimeout(0);
    expect(spyEnd).be.calledOnce;
  });

  it('should run event double click to recalculate the size', async () => {
    const initPos = 60;
    const el = await fixture<StudsResizer>(html`
      <studs-resizer position=${initPos}>
        <div>
          <h3>Panel One</h3>
          <div>Padded Content</div>
        </div>
        <div data-test="nextDiv">
          <h1>This is a Heading</h1>
          <p>This is a paragraph.</p>
        </div>
      </studs-resizer>
    `);
    expect(el).to.be.instanceOf(StudsResizer);

    // mock DOMRect for nextDiv
    const nextDiv = el.querySelector('[data-test="nextDiv"]')!;
    nextDiv.getBoundingClientRect = () => {
      return {
        bottom: 110,
        height: 110,
        left: 16,
        right: 576.7999877929688,
        top: 168,
        width: 200,
        x: 16,
        y: 168,
      } as DOMRect;
    };

    // expect initial position
    expect(nextDiv.getAttribute('data-size')).be.eq(String(100 - initPos));
    const resizeDivider = el?.shadowRoot?.querySelector('.resizeDivider');

    // resize panel to change to a new position
    // start event
    resizeDivider?.dispatchEvent(new MouseEvent('mousedown'));
    // resize event
    document.dispatchEvent(
      new PointerEvent('pointermove', {
        clientX: 75,
      })
    );
    // end event
    document.dispatchEvent(new PointerEvent('pointerup'));
    await aTimeout(0);
    expect(nextDiv.getAttribute('data-size')).be.not.eq(String(100 - initPos));

    // Double click to return back to initial position
    resizeDivider?.dispatchEvent(new MouseEvent('dblclick'));
    await elementUpdated(el);
    expect(nextDiv.getAttribute('data-size')).be.eq(String(100 - initPos));
  });
});
