'use client'

import { createComponent } from '@lit/react';
import { StudsAlertDialogGroup as StudsAlertDialogGroupClass } from '@studs/ui/overlays/alert-dialog-group';
import React from 'react';

export const StudsAlertDialogGroup
  = createComponent({
    tagName: 'studs-alert-dialog-group',
    elementClass: StudsAlertDialogGroupClass,
    react: React,
    events: {
      onChange: 'change',
      onClick: 'click',
      onFocus: 'focus',
      onBlur: 'blur',
    },
  });

