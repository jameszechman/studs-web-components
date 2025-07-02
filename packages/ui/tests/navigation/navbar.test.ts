import { StudsNavbar } from '../../src/components/navigation/navbar';
import { describe, it } from 'vitest';
import {
  fixture,
  html,
  expect,
  elementUpdated,
  aTimeout,
} from '@open-wc/testing';
import sinon from 'sinon';

const mockdata = [
  {
    label: 'Products',
    icon: 'category',
    initiallyOpened: true,
    links: [
      { label: 'Connectors', link: '/' },
      { label: 'Anchoring System', link: '/' },
      { label: 'Fastening System', link: '/' },
      { label: 'Structural Steel', link: '/' },
    ],
  },
  {
    label: 'Solutions',
    icon: 'emoji_objects',
    links: [
      { label: 'Industry Solutions', link: '/' },
      { label: 'Outdoor Living', link: '/' },
      { label: 'Project Ideas & Inspiration', link: '/' },
    ],
  },
  {
    label: 'Resource Center',
    icon: 'business_center',
  },
  {
    label: 'Training & Education',
    icon: 'school',
    links: [
      { label: 'Local Workshops', link: '/' },
      { label: 'Online Courses', link: '/' },
    ],
  },
  {
    label: 'Customer Service',
    icon: 'support_agent',
  },
];

describe('StudsNavbar', async () => {
  it('should render', async () => {
    const el = await fixture<StudsNavbar>(html`
      <studs-navbar></studs-navbar>
    `);
    expect(el).to.be.exist;
    expect(el).to.be.instanceOf(StudsNavbar);
  });

  //   it('should render with mode', async () => {
  //     const el = await fixture<StudsNavbar>(html`
  //       <studs-navbar .items="${mockdata}" showIcon></studs-navbar>
  //     `);
  //     const modes = ['horizontal', 'vertical'];
  //     const query = el.shadowRoot?.querySelector('div');
  //     modes.map(async (mode) => {
  //       await aTimeout(1);
  //       el.setAttribute('mode', mode);
  //       await elementUpdated(el);
  //       expect(el.getAttribute('mode')).to.equal(mode);
  //       expect(query?.classList.contains(`${mode}`)).to.be.true;
  //     });
  //   });

  //   it('should run event onclick', async () => {
  //     const el = await fixture<StudsNavbar>(html`
  //       <studs-navbar
  //         .items="${mockdata}"
  //         mode="vertical"
  //         showIcon
  //       ></studs-navbar>
  //     `);
  //
  //     const btns = el?.shadowRoot?.querySelectorAll('.nav-header');
  //     const firstHeader = btns?.[0] as StudsNavbar;
  //     firstHeader?.click();
  //     // onclick
  //     const spyOnClick = sinon.spy();
  //     firstHeader.addEventListener('click', spyOnClick);
  //     firstHeader?.click();
  //     await aTimeout(0);
  //     expect(spyOnClick.calledOnce).to.be.true;
  //     //on hover
  //     const spyOnHover = sinon.spy();
  //     firstHeader.addEventListener('mouseover', spyOnHover);
  //     firstHeader?.dispatchEvent(new MouseEvent('mouseover'));
  //     await aTimeout(0);
  //     expect(spyOnHover.calledOnce).to.be.true;
  //     //on leave
  //     const spyOnLeave = sinon.spy();
  //     firstHeader.addEventListener('mouseleave', spyOnLeave);
  //     firstHeader?.dispatchEvent(new MouseEvent('mouseleave'));
  //     await aTimeout(0);
  //     expect(spyOnLeave.calledOnce).to.be.true;
  //   });
});
