'use client'

import { createComponent } from '@lit/react';
import { StudsMenuItem as StudsMenuItemClass } from '@studs/ui/navigation/menu-item';
import React from 'react';

export const StudsMenuItem = createComponent(
  {
    tagName: 'studs-menu-item',
    elementClass: StudsMenuItemClass,
    react: React,
    events: {
      onClick: 'click',
      onFocus: 'focus',
      onBlur: 'blur'
    }
  }
)
export default StudsMenuItem
