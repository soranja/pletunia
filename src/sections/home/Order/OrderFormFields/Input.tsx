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
      className="w-full resize-none bg-white/20 px-2 py-1 leading-6 ring-1 ring-transparent outline-none focus:ring-white"
      placeholder="..."
      title="Input field"
    />
  );
}
