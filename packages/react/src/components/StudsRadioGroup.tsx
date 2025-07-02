'use client'

import { createComponent } from '@lit/react';
import { StudsRadioGroup as StudsRadioGroupClass } from '@studs/ui/inputs/radio-group';
import React from 'react';

export const StudsRadioGroup = createComponent({
    tagName: 'studs-radio-group',
    elementClass: StudsRadioGroupClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

