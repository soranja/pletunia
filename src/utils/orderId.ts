import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 5);

function getNextCounter(): number {
  if (typeof window === 'undefined') return 1;
  try {
    const current = parseInt(localStorage.getItem('orderCounter') || '0', 10);
    const next = current + 1;
    localStorage.setItem('orderCounter', String(next));
    return next;
  } catch {
    return 1;
  }
}

export function generateOrderId(): string {
  const incrementPart = String(getNextCounter()).padStart(2, '0'); // 01, 02, ...
  return `#${incrementPart}-${nanoid()}`;
}
