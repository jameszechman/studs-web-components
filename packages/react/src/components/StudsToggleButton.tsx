'use client'

import { createComponent } from '@lit/react';
import { StudsToggleButton as StudsToggleButtonClass } from '@studs/ui/display/toggle-button';
import React from 'react';

export const StudsToggleButton
  = createComponent({
    tagName: 'studs-toggle-button',
    elementClass: StudsToggleButtonClass,
    react: React,
    events: {
      onChange: 'change',
      onClick: 'click',
      onFocus: 'focus',
      onBlur: 'blur',
    },
  });

