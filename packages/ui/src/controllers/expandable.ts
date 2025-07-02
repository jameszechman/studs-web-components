import { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';
import {getRootTransition } from '../utils/shared.ts';

export class ExpandableController implements ReactiveController {
  host: ReactiveControllerHost;
  el!: HTMLDetailsElement;
  summary!: HTMLElement;
  content!: HTMLElement;
  isClosing = false;
  isExpanding = false;
  animation!: Animation | null;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostConnected() {
    this.host.updateComplete.then(() => {
      this.el = (this.host as LitElement).shadowRoot?.querySelector('details')!;
      this.summary = (this.host as LitElement).shadowRoot?.querySelector('summary')!;
      this.content = (this.host as LitElement).shadowRoot?.querySelector('.content')!;
      if (this.summary) this.summary.addEventListener('click', (e) => this.onClick(e));
    });
  }

  hostDisconnected() {
    this.summary.removeEventListener('click', (e) => this.onClick(e));
  }

  public toggle(open: boolean) {
    this.el.style.overflow = 'hidden';
    if(open) this.open();
    else this.shrink();
  }
  // Function called when user clicks on the summary
  private onClick(e: PointerEvent | MouseEvent) {
    e.preventDefault();
    this.el.style.overflow = 'hidden';
    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  // Function called to open the element after click
  private open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    (this.host as any as HTMLElement).setAttribute("open", "true");
    window.requestAnimationFrame(() => this.expand());
  }
  private animateElement(startHeight: string, endHeight: string, isExpanding: boolean) {
    const duration = getRootTransition('small');

    if (typeof this.animation?.cancel === 'function') {
      this.animation.cancel();
    }

    this.animation = this.el.animate({
      height: [startHeight, endHeight]
    }, {
      duration,
      easing: 'ease-out'
    });

    this.animation.onfinish = () => this.onAnimationFinish(isExpanding);
    this.animation.oncancel = () => {
      this.isExpanding = false;
      this.isClosing = false;
    };
  }

  private shrink() {
    this.isClosing = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;
    this.animateElement(startHeight, endHeight, false);
    (this.host as any as HTMLElement).removeAttribute("open");
  }

  private expand() {
    this.isExpanding = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
    this.animateElement(startHeight, endHeight, true);
  }

  // Callback when the shrink or expand animations are done
  private onAnimationFinish(open: boolean) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = this.el.style.overflow = '';
  }
}