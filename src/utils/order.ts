import type { TFormData, TCard } from '@/types';
import { generateOrderId } from './orderId';

export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export function getInputValue(form: HTMLFormElement, selector: string): string {
  return (
    (form.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement)?.value ?? ''
  ).trim();
}

export function collectFormValues(form: HTMLFormElement) {
  return {
    name: getInputValue(form, 'input[name="name"]'),
    email: getInputValue(form, 'input[name="email"]'),
    comment: getInputValue(form, '#comment'),
  };
}

export function idsToCardNames(ids: number[], cards: TCard[]): string[] {
  return ids
    .map((id) => cards.find((card) => card.id === id))
    .filter((card): card is TCard => Boolean(card))
    .map((card) => card.name);
}

export function idsToCardIds(ids: number[], cards: TCard[]): number[] {
  return ids
    .map((id) => cards.find((card) => card.id === id))
    .filter((card): card is TCard => Boolean(card))
    .map((card) => card.id);
}

export function validateEmail(email: string) {
  return EMAIL_REGEX.test(email);
}

export function buildOrderPayload(data: TFormData) {
  const orderId = generateOrderId();
  return { ...data, orderId };
}

export async function submitOrder(payload: ReturnType<typeof buildOrderPayload>) {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let msg = `Order submit failed: ${res.status}`;
    try {
      const body = await res.json();
      if (body?.error) msg += ` – ${body.error}`;
    } catch {}
    throw new Error(msg);
  }
  return payload.orderId;
}
