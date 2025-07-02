'use client'

import { createComponent } from '@lit/react';
import { StudsSkeleton as StudsSkeletonClass } from '@studs/ui/display/skeleton';
import React from 'react';

export const StudsSkeleton = createComponent({
    tagName: 'studs-skeleton',
    elementClass: StudsSkeletonClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});

