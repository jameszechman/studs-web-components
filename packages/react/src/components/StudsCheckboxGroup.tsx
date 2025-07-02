'use client'

import { createComponent } from '@lit/react';
import { StudsCheckboxGroup as StudsCheckboxGroupClass } from '@studs/ui/inputs/checkbox-group';
import React from 'react';

export const StudsCheckboxGroup = createComponent({
    tagName: 'studs-checkbox-group',
    elementClass: StudsCheckboxGroupClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

