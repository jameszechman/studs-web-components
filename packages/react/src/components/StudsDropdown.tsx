'use client'

import { createComponent } from '@lit/react';
import { StudsDropdown as StudsDropdownClass } from '@studs/ui/inputs/dropdown';
import React from 'react';

export const StudsDropdown = createComponent({
    tagName: 'studs-dropdown',
    elementClass: StudsDropdownClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
        onActionButtonClick: 'action-button-click'
    },
});

