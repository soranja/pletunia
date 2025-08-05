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
      className="text-black px-5 lg:w-80 py-2 rounded-lg"
      placeholder="Enter text"
      title="Input field"
    />
  );
}
