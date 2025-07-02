'use client'

import { createComponent } from '@lit/react';
import { StudsPagination as StudsPaginationClass } from '@studs/ui/display/pagination';
import React from 'react';

export const StudsPagination = createComponent({
    tagName: 'studs-pagination',
    elementClass: StudsPaginationClass,
    react: React,
    events: {
        onChange: 'change',
        onClick: 'click',
        onFocus: 'focus',
        onBlur: 'blur',
        onChangePage: "changePage",
        onChangeItemsPerPage: "change-items-per-page"
    },
});

