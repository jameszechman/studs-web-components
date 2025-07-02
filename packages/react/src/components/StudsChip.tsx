'use client'

import { createComponent } from '@lit/react';
import { StudsChip as StudsChipClass } from '@studs/ui/display/chip';
import React from 'react';

export const StudsChip = createComponent({
    tagName: 'studs-chip',
    elementClass: StudsChipClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
        onDelete: "delete"
    },
});

