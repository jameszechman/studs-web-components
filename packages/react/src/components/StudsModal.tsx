'use client'

import { createComponent } from '@lit/react';
import { StudsModal as StudsModalClass } from '@studs/ui/overlays/modal';
import React from 'react';

export const StudsModal = createComponent({
    tagName: 'studs-modal',
    elementClass: StudsModalClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

