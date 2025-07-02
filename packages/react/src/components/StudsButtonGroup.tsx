'use client'

import { createComponent } from '@lit/react';
import { StudsButtonGroup as StudsButtonGroupClass } from '@studs/ui/display/button-group';
import React from 'react';


export const StudsButtonGroup = createComponent({
    tagName: 'studs-button-group',
    elementClass: StudsButtonGroupClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

