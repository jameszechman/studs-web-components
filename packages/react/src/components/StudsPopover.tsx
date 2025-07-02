'use client'

import { createComponent } from '@lit/react';
import { StudsPopover as StudsPopoverClass } from '@studs/ui/overlays/popover';
import React from 'react';

export const StudsPopover = createComponent({
    tagName: 'studs-popover',
    elementClass: StudsPopoverClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

