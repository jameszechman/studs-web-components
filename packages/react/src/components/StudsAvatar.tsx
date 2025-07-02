'use client'

import { StudsAvatar as StudsAvatarClass } from '@studs/ui/display/avatar';
import { createComponent } from '@lit/react';
import React from 'react';

export const StudsAvatar = createComponent(
  {
    tagName: 'studs-avatar',
    elementClass: StudsAvatarClass,
    react: React,
    events: {
      "onClick": 'click',
      "onSelected": 'selected'
    },
  }
);


