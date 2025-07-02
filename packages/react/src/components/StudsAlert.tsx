'use client'

import { createComponent } from '@lit/react';
import { StudsAlert as StudsAlertClass } from '@studs/ui/display/alert';
import React from 'react';

export const StudsAlert = createComponent({
    tagName: 'studs-alert',
    elementClass: StudsAlertClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

