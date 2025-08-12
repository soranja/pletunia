'use client';
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  PropsWithChildren,
} from 'react';
import postcards from '@/data/home/postcards.json';
import { TContext } from '@/types/context';

const PostcardsSelectionContext = createContext<TContext | null>(null);

export function PostcardsSelectionProvider({ children }: PropsWithChildren) {
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
  const [checkedCards, setCheckedCards] = useState<boolean[]>(() => postcards.map(() => false));

  const toggleById = useCallback((id: number) => {
    const index = postcards.findIndex((c) => c.id === id);
    if (index < 0) return;

    setSelectedCardIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id].sort((a, b) => a - b)
    );

    setCheckedCards((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedCardIds([]);
    setCheckedCards(postcards.map(() => false));
  }, []);

  const value = useMemo(
    () => ({ selectedCardIds, checkedCards, toggleById, clearAll }),
    [selectedCardIds, checkedCards, toggleById, clearAll]
  );

  return (
    <PostcardsSelectionContext.Provider value={value}>
      {children}
    </PostcardsSelectionContext.Provider>
  );
}

export function usePostcardsSelection() {
  const context = useContext(PostcardsSelectionContext);
  if (!context)
    throw new Error('usePostcardsSelection must be used within PostcardsSelectionProvider');
  return context;
}
