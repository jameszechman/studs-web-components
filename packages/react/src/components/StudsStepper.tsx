'use client'

import { createComponent } from '@lit/react';
import { StudsStepper as StudsStepperClass } from '@studs/ui/display/stepper';
import React from 'react';

export const StudsStepper = createComponent({
    tagName: 'studs-stepper',
    elementClass: StudsStepperClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
    },
});
export default  StudsStepper;
