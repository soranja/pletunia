import { EMAIL_REGEX } from '@/constants';
import { generateOrderId } from './orderId';
import type { TFormData, TCard, TOrderSuccess } from '@/types';

export function normalizeLang(x: unknown): 'en' | 'ru' {
  const s = String(x || '').toLowerCase();
  if (s.startsWith('ru')) return 'ru';
  if (s.startsWith('en')) return 'en';
  return 'en';
}

export function idsToCardNames(ids: number[], cards: TCard[]): string[] {
  return ids
    .map((id) => cards.find((card) => card.id === id))
    .filter((card): card is TCard => Boolean(card))
    .map((card) => card.name);
}

export function validateEmail(email: string) {
  return EMAIL_REGEX.test(email);
}

export function buildOrderPayload(data: TFormData, lang?: string) {
  const orderId = generateOrderId();
  return { ...data, orderId, ...(lang ? { lang } : {}) };
}

export async function submitOrder(
  payload: ReturnType<typeof buildOrderPayload>
): Promise<TOrderSuccess> {
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

  const data = await res.json();
  return {
    ok: true,
    id: data?.id,
    orderId: data?.orderId ?? payload.orderId,
    selectedIds: data?.selectedIds ?? [],
  };
}
