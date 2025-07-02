'use client'

import { createComponent } from '@lit/react';
import { StudsInput as StudsInputClass } from '@studs/ui/inputs/input';
import React from 'react';

export const StudsInput = createComponent({
    tagName: 'studs-input',
    elementClass: StudsInputClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

