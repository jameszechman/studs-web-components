'use client'

import { createComponent } from '@lit/react';
import { StudsListItem as StudsListItemClass } from "@studs/ui/display/list-item";
import React from "react";

export const StudsListItem = createComponent({
    tagName: "studs-list-item",
    elementClass: StudsListItemClass,
    react: React,
    events: {
        onChange: "change",
        onClick: "click",
        onFocus: "focus",
        onBlur: "blur",
    },
});

