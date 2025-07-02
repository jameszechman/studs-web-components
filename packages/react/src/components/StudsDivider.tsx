'use client'

import { createComponent } from '@lit/react';
import { StudsDivider as StudsDividerClass } from "@studs/ui/display/divider";
import React from "react";

export const StudsDivider = createComponent({
  tagName: "studs-divider",
  elementClass: StudsDividerClass,
  react: React,
  events: {
    onChange: "change",
    onClick: "click",
    onFocus: "focus",
    onBlur: "blur",
  }
});

