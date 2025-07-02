'use client'

import { createComponent } from '@lit/react';
import { StudsHelperText as StudsHelperTextClass } from "@studs/ui/inputs/helper-text";
import React from "react";

export const StudsHelperText = createComponent({
  tagName: "studs-helper-text",
  elementClass: StudsHelperTextClass,
  react: React,
  events: {
    onChange: "change",
    onClick: "click",
    onFocus: "focus",
    onBlur: "blur",
  }
});

