'use client'

import { createComponent } from '@lit/react';
import { StudsTooltip as StudsTooltipClass } from '@studs/ui/overlays/tooltip';
import React from 'react';

export const StudsTooltip = createComponent({
    tagName: 'studs-tooltip',
    elementClass: StudsTooltipClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

