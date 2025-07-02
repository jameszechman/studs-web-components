'use client'

import { createComponent } from '@lit/react';
import { StudsBadge as StudsBadgeClass } from '@studs/ui/display/badge';
import React from 'react';


export const StudsBadge = createComponent({
    tagName: 'studs-badge',
    elementClass: StudsBadgeClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

