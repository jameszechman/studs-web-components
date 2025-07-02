'use client'

import { StudsCollapse as StudsCollapseClass } from '@studs/ui/display/collapse';
import { createComponent } from '@lit/react';
import React from 'react';

export const StudsCollapse
  = createComponent({
    tagName: 'studs-collapse',
    elementClass: StudsCollapseClass,
    react: React,
    events: {
      onClick: 'click',
    },
  });


