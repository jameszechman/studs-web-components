'use client'

import { createComponent } from '@lit/react';
import { StudsTabs as StudsTabsClass } from '@studs/ui/display/tabs';
import React from 'react';

export const StudsTabs = createComponent({
    tagName: 'studs-tabs',
    elementClass: StudsTabsClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

