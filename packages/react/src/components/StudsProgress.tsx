'use client'

import { StudsProgress as StudsProgressClass } from '@studs/ui/display/progress';
import { createComponent } from '@lit/react';
import React from 'react';

export const StudsProgress
  = createComponent({
    tagName: 'studs-progress',
    elementClass: StudsProgressClass,
    react: React,
    events: {},
  });

