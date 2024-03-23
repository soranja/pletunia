"use client";

import React from "react";

interface InputProps {
  id: string;
  name: string;
}

export function Input({ id, name }: InputProps) {
  return (
    <input
      required
      type="text"
      id={id}
      name={name}
      className="text-black px-5 lg:w-80 py-2 rounded-lg"
    />
  );
}
