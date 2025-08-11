'use client';

import React from 'react';
import { InputProps } from '@/types/props';

export function Input({ id, name, onChange }: InputProps) {
  return (
    <input
      id={id}
      name={name}
      onChange={onChange}
      type="text"
      className="w-full rounded-md bg-white/20 px-2 py-1"
      placeholder="..."
      title="Input field"
    />
  );
}
