'use client'

import { createComponent } from '@lit/react';
import { StudsSwitch as StudsSwitchClass } from '@studs/ui/inputs/switch';
import React from 'react';

export const StudsSwitch = createComponent({
    tagName: 'studs-switch',
    elementClass: StudsSwitchClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

