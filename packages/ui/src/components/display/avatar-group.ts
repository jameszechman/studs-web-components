
/**
 * @element studs-avatar-group
 */

import { studsElement } from '../../decorators/studs-element.ts';
import { StudsElement } from '../../mixins/studsElement.ts';
import { CSSResult, html, LitElement, nothing } from 'lit';
import { StudsAvatar } from './avatar.ts';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { watch } from '../../directives/watch.ts';
import style from "@studs/styles/components/avatarGroup";
import { repeat } from 'lit/directives/repeat.js';
import { ref, createRef } from 'lit/directives/ref.js';

@studsElement('studs-avatar-group')
export class StudsAvatarGroup extends StudsElement(LitElement) {
  static override styles = style as CSSResult;

  /**
   * Sets the Size of the Avatar(s)
   */
  @property({type: String}) size: StudsAvatar['size'];
  /**
   * Set the maximum number of avatars to show
   */
  @property({type: Number}) max: number = 6;

  @queryAssignedElements() avatars!: HTMLElement[]
  @queryAssignedElements({slot: 'hidden'}) hiddenAvatars!: HTMLElement[]

  @state() listOfHidden!: HTMLElement[];

  @watch('size')
  onSizeChange() {
    this.updateComplete.then(() => {
      (this.avatars).forEach((avatar) => (avatar as StudsAvatar).size = this.size)
    })
  }

  @watch('max')
  onMaxChange() {
    this.updateComplete.then(() => {
      if(this.hiddenAvatars.length > 0) {
        this.hiddenAvatars.forEach((avatar) => {
          avatar.slot = '';
        })
      }
      const remainders = Array.from(this.avatars).slice(this.max);
      if(remainders.length > 0) {
        remainders.forEach((avatar) => {
          avatar.slot = 'hidden';
        })
      }
      this.onSizeChange()
    })
  }
  override render() {
    return html`
      <div>
        <slot @slotchange=${this.onSlotChange}></slot>
        <slot name="hidden" @slotchange=${this.onHiddenSlotChange}></slot>
        ${this.listOfHidden?.length > 0 ? html`<p>+${this.listOfHidden.length}
          <studs-popover position="right" on="hover" hide-close-button>
            <studs-list size="small">
            ${repeat(this.listOfHidden, (avatar) => avatar, (avatar) => {
              const prefixRef = createRef();
              this.updateComplete.then(() => {
                if((prefixRef.value as HTMLElement).childElementCount < 1) {
                  const cloned = avatar.cloneNode(true);
                  (prefixRef.value as HTMLElement).appendChild(cloned);
                }
              })
              return html`<studs-list-item>
                <span slot="prefix" ${ref(prefixRef)}>
                </span>
                <span>${(avatar as StudsAvatar).name}</span></studs-list-item>`;
            })}
            </studs-list>
          </studs-popover>
        </p>` : nothing}
      </div>
    `
  }

  private onSlotChange() {
    if(this.avatars.length > 0) {
      for(let i = 0, j = this.avatars.length + 1; i < this.avatars.length; i++) {
        this.avatars[i].style.setProperty('--z', String(j));
        j = j -1;
      }
    }
  }

  private onHiddenSlotChange() {
      this.listOfHidden = Array.from(this.hiddenAvatars)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'studs-avatar-group': StudsAvatarGroup;
  }
}
