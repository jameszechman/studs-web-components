'use client'

import { createComponent } from '@lit/react';
import { StudsToggleButtonGroup as StudsToggleButtonGroupClass } from '@studs/ui/display/toggle-button-group';
import React from 'react';

export const StudsToggleButtonGroup
  = createComponent({
    tagName: 'studs-toggle-button-group',
    elementClass: StudsToggleButtonGroupClass,
    react: React,
    events: {
      onChange: 'change',
      onClick: 'click',
      onFocus: 'focus',
      onBlur: 'blur',
    },
  });

