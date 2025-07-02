'use client'

import { createComponent } from '@lit/react';
import { StudsSlider as StudsSliderClass } from '@studs/ui/inputs/slider';
import React from 'react';

export const StudsSlider = createComponent({
    tagName: 'studs-slider',
    elementClass: StudsSliderClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

