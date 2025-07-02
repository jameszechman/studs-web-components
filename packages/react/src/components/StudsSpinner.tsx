'use client'

import { createComponent } from '@lit/react';
import { StudsSpinner as StudsSpinnerClass } from '@studs/ui/display/spinner';
import React from 'react';

export const StudsSpinner = createComponent({
    tagName: 'studs-spinner',
    elementClass: StudsSpinnerClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

