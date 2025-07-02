'use client'

import { createComponent } from '@lit/react';
import { StudsErrorMessage as StudsErrorMessageClass } from "@studs/ui/inputs/error-message";
import React from "react";

export const StudsErrorMessage = createComponent({
  tagName: "studs-error-message",
  elementClass: StudsErrorMessageClass,
  react: React,
  events: {
    onChange: "change",
    onClick: "click",
    onFocus: "focus",
    onBlur: "blur",
  }
});

