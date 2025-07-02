'use client'

import { createComponent } from '@lit/react';
import { StudsFileUpload as StudsFileUploadClass } from '@studs/ui/inputs/file-upload';
import React from 'react';

export const StudsFileUpload = createComponent({
    tagName: 'studs-file-upload',
    elementClass: StudsFileUploadClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        dragOver: 'dragover',
        dragEnter: 'dragenter',
        dragLeave: 'dragleave',
        drop: 'drop',
    },
});

