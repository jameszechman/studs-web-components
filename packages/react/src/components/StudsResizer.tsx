'use client'

import { createComponent } from '@lit/react';
import { StudsResizer as StudsResizerClass } from '@studs/ui/display/resizer';
import React from 'react';

export const StudsResizer = createComponent({
    tagName: 'studs-resizer',
    elementClass: StudsResizerClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

