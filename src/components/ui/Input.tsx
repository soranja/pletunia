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
      className="rounded-lg px-5 py-2 text-black lg:w-80"
      placeholder="Enter text"
      title="Input field"
    />
  );
}
