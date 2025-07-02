'use client'

import { createComponent } from '@lit/react';
import { StudsRadio as StudsRadioClass } from '@studs/ui/inputs/radio';
import React from 'react';

export const StudsRadio = createComponent({
    tagName: 'studs-radio',
    elementClass: StudsRadioClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

