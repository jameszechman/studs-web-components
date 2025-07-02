"use client";

import React from 'react'

import { StudsDivider } from '@studs/react';

export const HR: React.FC<{
  className?: string
}> = props => {
  const { className } = props

  return <StudsDivider />
}
