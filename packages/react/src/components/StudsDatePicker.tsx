'use client'

import { createComponent } from '@lit/react';
import { StudsDatePicker as StudsDatePickerClass } from '@studs/ui/inputs/date-picker';
import React from 'react';

export const StudsDatePicker = createComponent({
    tagName: 'studs-date-picker',
    elementClass: StudsDatePickerClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

