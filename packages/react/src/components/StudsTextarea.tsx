'use client'

import { createComponent } from '@lit/react';
import { StudsTextarea as StudsTextareaClass } from '@studs/ui/inputs/textarea';
import React from 'react';

export const StudsTextarea = createComponent({
    tagName: 'studs-textarea',
    elementClass: StudsTextareaClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

