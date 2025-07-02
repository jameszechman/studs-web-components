'use client'

import { createComponent } from '@lit/react';
import { StudsAlertDialog as StudsAlertDialogClass } from '@studs/ui/overlays/alert-dialog';
import React from 'react';

export const StudsAlertDialog
  = createComponent({
    tagName: 'studs-alert-dialog',
    elementClass: StudsAlertDialogClass,
    react: React,
    events: {
      onChange: 'change',
      onClick: 'click',
      onFocus: 'focus',
      onBlur: 'blur',
    },
  });

