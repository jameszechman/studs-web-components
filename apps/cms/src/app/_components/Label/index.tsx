"use client";

import React from 'react'
import { StudsLabel } from '@studs/react';

export const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StudsLabel>{children}</StudsLabel>
}
