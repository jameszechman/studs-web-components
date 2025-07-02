'use client'

import { createComponent } from '@lit/react';
import { StudsMenu as StudsMenuClass } from '@studs/ui/navigation/menu';
import React from 'react';

export const StudsMenu = createComponent({
    tagName: 'studs-menu',
    elementClass: StudsMenuClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

