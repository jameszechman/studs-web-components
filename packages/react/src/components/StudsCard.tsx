'use client'

import { createComponent } from '@lit/react';
import { StudsCard as StudsCardClass } from '@studs/ui/display/card';
import React from 'react';

export const StudsCard = createComponent({
    tagName: 'studs-card',
    elementClass: StudsCardClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur'
    },
});

