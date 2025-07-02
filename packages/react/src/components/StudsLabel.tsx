'use client'

import { createComponent } from '@lit/react';
import { StudsLabel as StudsLabelClass } from "@studs/ui/inputs/label";
import React from "react";

export const StudsLabel = createComponent({
  tagName: "studs-label",
  elementClass: StudsLabelClass,
  react: React,
  events: {
    onChange: "change",
    onClick: "click",
    onFocus: "focus",
    onBlur: "blur",
  }
});

