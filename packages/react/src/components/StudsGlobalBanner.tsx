'use client'

import { StudsGlobalBanner as StudsGlobalBannerClass } from '@studs/ui/display/global-banner';
import { createComponent } from '@lit/react';
import React from 'react';

export const StudsGlobalBanner
  = createComponent({
    tagName: 'studs-global-banner',
    elementClass: StudsGlobalBannerClass,
    react: React,
    events: {},
  });

