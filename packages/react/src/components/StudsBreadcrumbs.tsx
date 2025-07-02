'use client'

import { StudsBreadcrumbs as StudsBreadcrumbsClass } from "@studs/ui/display/breadcrumbs";
import { createComponent } from '@lit/react';
import React from 'react';

export const StudsBreadcrumbs = createComponent({
    tagName: 'studs-breadcrumbs',
    elementClass: StudsBreadcrumbsClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

