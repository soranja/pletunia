'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { OrderFieldProps } from '@/types/props';

export function OrderField({ field, state, formValidation, onChange }: OrderFieldProps) {
  const { t } = useTranslation('order');

  const requiredMark = field.required ? <span className="text-red-500"> *</span> : null;

  const sharedFieldParams = {
    id: field.name,
    name: field.name,
    placeholder: field.placeholder,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e, field.name),
    className:
      'w-full resize-none bg-white/20 px-2 py-1 leading-6 ring-1 ring-transparent outline-none focus:ring-white',
  };

  return (
    <div className="flex min-h-[90px] w-full flex-col gap-y-2">
      <label htmlFor={field.name}>
        {t(field.label)} {requiredMark}
      </label>

      {field.kind === 'textarea' ? (
        <textarea {...sharedFieldParams} rows={field.rows ?? 3} {...field.textareaProps} />
      ) : (
        <input {...sharedFieldParams} type={field.kind} {...field.inputProps} />
      )}

      {/* Validation messages */}
      {state === 'validating' && !formValidation[field.name] && field.required && (
        <p className="text-xs text-red-500">
          {field.name === 'email'
            ? (document.querySelector('input[name="email"]') as HTMLInputElement)?.value.trim() ===
              ''
              ? t('order:formValidation.emptyEmail')
              : t('order:formValidation.invalidEmailFormat')
            : t(`order:formValidation.empty${field.name[0].toUpperCase() + field.name.slice(1)}`)}
        </p>
      )}
    </div>
  );
}
