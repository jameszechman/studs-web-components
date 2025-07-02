'use client'

import { createComponent } from '@lit/react';
import { StudsDrawer as StudsDrawerClass } from '@studs/ui/overlays/drawer';
import React from 'react';

export const StudsDrawer = createComponent({
    tagName: 'studs-drawer',
    elementClass: StudsDrawerClass,
    react: React,
    events: {
        onToggle: 'on-toggle',
    },
});

