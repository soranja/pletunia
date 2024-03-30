"use client";

import React from "react";

interface InputProps {
  id: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ id, name, onChange }: InputProps) {
  return (
    <input
      id={id}
      name={name}
      onChange={onChange}
      type="text"
      className="text-black px-5 lg:w-80 py-2 rounded-lg"
    />
  );
}
