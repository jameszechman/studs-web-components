'use client'

import { createComponent } from '@lit/react';
import { StudsImage as StudsImageClass } from '@studs/ui/display/image';
import React from 'react';

export const StudsImage = createComponent({
    tagName: 'studs-image',
    elementClass: StudsImageClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

