'use client'

import { createComponent } from '@lit/react';
import { StudsToaster as StudsToasterClass } from '@studs/ui/overlays/toaster';
import React from 'react';

export const StudsToaster = createComponent({
    tagName: 'studs-toaster',
    elementClass: StudsToasterClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

