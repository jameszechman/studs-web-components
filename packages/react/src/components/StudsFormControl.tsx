'use client'

import { createComponent } from '@lit/react';
import { StudsFormControl as StudsFormControlClass } from "@studs/ui/inputs/form-control";
import React from "react";

export const StudsFormControl = createComponent({
  tagName: "studs-form-control",
  elementClass: StudsFormControlClass,
  react: React,
  events: {
    onChange: "change",
    onClick: "click",
    onFocus: "focus",
    onBlur: "blur",
  }
});

