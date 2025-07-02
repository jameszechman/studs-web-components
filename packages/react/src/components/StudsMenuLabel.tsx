'use client'

import { createComponent } from '@lit/react';
import { StudsMenuLabel as StudsMenuLabelClass } from '@studs/ui/navigation/menu-label';
import React from 'react';

export const StudsMenuLabel = createComponent(
  {
    tagName: 'studs-menu-label',
    elementClass: StudsMenuLabelClass,
    react: React,
    events: {
      onClick: 'click',
      onFocus: 'focus',
      onBlur: 'blur'
    }
  }
)
export default StudsMenuLabel
