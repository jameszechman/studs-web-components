'use client'

import { createComponent } from '@lit/react';
import { StudsCheckbox as StudsCheckboxClass } from '@studs/ui/inputs/checkbox';
import React from 'react';

export const StudsCheckbox = createComponent({
    tagName: 'studs-checkbox',
    elementClass: StudsCheckboxClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

