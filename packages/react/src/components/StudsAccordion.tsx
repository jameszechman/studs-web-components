'use client'

import { createComponent } from '@lit/react';
import { StudsAccordion as StudsAccordionClass } from '@studs/ui/display/accordion';
import React from 'react';

export const StudsAccordion = createComponent({
    tagName: 'studs-accordion',
    elementClass: StudsAccordionClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
        onSearch: 'search',
    },
});


