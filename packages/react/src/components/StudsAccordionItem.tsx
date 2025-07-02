'use client'

import { createComponent } from '@lit/react';
import { StudsAccordionItem as StudsAccordionItemClass } from '@studs/ui/display/accordion-item';
import React from 'react';


export const StudsAccordionItem = createComponent({
    tagName: 'studs-accordion-item',
    elementClass: StudsAccordionItemClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

