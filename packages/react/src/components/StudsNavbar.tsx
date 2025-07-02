'use client'

import { createComponent } from '@lit/react';
import { StudsNavbar as StudsNavbarClass } from '@studs/ui/navigation/navbar';
import React from 'react';

export const StudsNavbar = createComponent({
    tagName: 'studs-navbar',
    elementClass: StudsNavbarClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});


