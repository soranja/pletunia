import { RESERVATIONS_EVENT, LOCAL_STORAGE_KEY_RESERVED_CARDS } from '@/constants';
import { TReservedCard } from '@/types';

function notifyChange() {
  try {
    window.dispatchEvent(new Event(RESERVATIONS_EVENT));
  } catch {}
}

function loadRaw(): TReservedCard[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_RESERVED_CARDS);
    return raw ? (JSON.parse(raw) as TReservedCard[]) : [];
  } catch {
    return [];
  }
}

function saveRaw(list: TReservedCard[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_RESERVED_CARDS, JSON.stringify(list));
    notifyChange();
  } catch {}
}

function purgeExpired(list: TReservedCard[], now = Date.now()): TReservedCard[] {
  const cleaned = list.filter((x) => !x.expiresAt || x.expiresAt > now);
  if (cleaned.length !== list.length) saveRaw(cleaned);
  return cleaned;
}

export function getReservedSet(): Set<number> {
  const now = Date.now();
  const list = purgeExpired(loadRaw(), now);
  return new Set(list.map((x) => x.id));
}

export function isReserved(id: number): boolean {
  return getReservedSet().has(id);
}

export function reserveCards(ids: number[], orderId: string, ttlDays = 30) {
  const now = Date.now();
  const expiresAt = ttlDays > 0 ? now + ttlDays * 24 * 60 * 60 * 1000 : undefined;

  const existing = purgeExpired(loadRaw(), now);
  const existingIds = new Set(existing.map((x) => x.id));
  const additions: TReservedCard[] = ids
    .filter((id) => !existingIds.has(id))
    .map((id) => ({ id, orderId, reservedAt: now, expiresAt }));

  if (additions.length) saveRaw([...existing, ...additions]);
}

export function unreserveCards(ids: number[]) {
  const set = new Set(ids);
  const existing = loadRaw();
  const next = existing.filter((x) => !set.has(x.id));
  if (next.length !== existing.length) saveRaw(next);
}

export function clearAllReservations() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY_RESERVED_CARDS);
    notifyChange();
  } catch {}
}
