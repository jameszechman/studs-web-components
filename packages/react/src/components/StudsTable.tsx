'use client'

import { createComponent } from '@lit/react';
import { StudsTable as StudsTableClass } from '@studs/ui/display/table';
import React from 'react';

export const StudsTable = createComponent({
    tagName: 'studs-table',
    elementClass: StudsTableClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

