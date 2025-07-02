'use client'

import { createComponent } from '@lit/react';
import { StudsIcon as StudsIconClass } from '@studs/ui/display/icon';
import React from 'react';

export const StudsIcon = createComponent({
    tagName: 'studs-icon',
    elementClass: StudsIconClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

