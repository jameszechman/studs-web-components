'use client'

import { createComponent } from '@lit/react';
import { StudsCarousel as StudsCarouselClass } from '@studs/ui/display/carousel';
import React from 'react';

export const StudsCarousel = createComponent({
    tagName: 'studs-carousel',
    elementClass: StudsCarouselClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

