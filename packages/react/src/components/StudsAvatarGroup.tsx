'use client'

import {StudsAvatarGroup as StudsAvatarGroupClass} from '@studs/ui/display/avatar-group';
import { createComponent } from '@lit/react';
import React from 'react';

export const StudsAvatarGroup = createComponent({
  tagName: 'studs-avatar-group',
  elementClass: StudsAvatarGroupClass,
  react: React,
  events: {}
})

