'use client'

import { createComponent } from '@lit/react';
import { StudsMenuTitle as StudsMenuTitleClass } from '@studs/ui/navigation/menu-title';
import React from 'react';

export const StudsMenuTitle = createComponent(
  {
    tagName: 'studs-menu-title',
    elementClass: StudsMenuTitleClass,
    react: React,
    events: {
      onClick: 'click',
      onFocus: 'focus',
      onBlur: 'blur'
    }
  }
)
export default StudsMenuTitle
