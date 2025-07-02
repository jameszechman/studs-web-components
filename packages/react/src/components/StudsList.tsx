'use client'

import { createComponent } from '@lit/react';
import { StudsList as StudsListClass } from "@studs/ui/display/list";
import React from "react";

export const StudsList = createComponent({
    tagName: "studs-list",
    elementClass: StudsListClass,
    react: React,
    events: {
        onChange: "change",
        onClick: "click",
        onFocus: "focus",
        onBlur: "blur",
    },
});

