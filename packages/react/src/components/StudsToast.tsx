'use client'

import { createComponent } from '@lit/react';
import { StudsToast as StudsToastClass } from '@studs/ui/overlays/toast';
import React from 'react';

export const StudsToast = createComponent({
    tagName: 'studs-toast',
    elementClass: StudsToastClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

