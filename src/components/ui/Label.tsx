'use client';

import React from 'react';
import { LabelProps } from '@/types/props';

export function Label({ htmlFor, children }: LabelProps) {
  return <label htmlFor={htmlFor}>{children}</label>;
}
