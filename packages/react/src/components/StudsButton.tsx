'use client'

import { createComponent } from '@lit/react';
import { StudsButton as StudsButtonClass } from '@studs/ui/display/button';
import React from 'react';

export const StudsButton = createComponent({
    tagName: 'studs-button',
    elementClass: StudsButtonClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

