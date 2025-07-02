'use client'

import { createComponent } from '@lit/react';
import { StudsAppShell as StudsAppShellClass } from '@studs/ui/navigation/app-shell';
import React from 'react';

export const StudsAppShell = createComponent({
    tagName: 'studs-app-shell',
    elementClass: StudsAppShellClass,
    react: React,
    events: {
    },
});

