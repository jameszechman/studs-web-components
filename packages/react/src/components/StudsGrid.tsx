'use client'

import { createComponent } from '@lit/react';
import { StudsGrid as StudsGridClass } from '@studs/ui/display/grid';
import React from 'react';

export const StudsGrid = createComponent({
    tagName: 'studs-grid',
    elementClass: StudsGridClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

