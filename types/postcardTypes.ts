export interface PostcardProps {
  updateCardsData: (selectionMap: Record<number, boolean>) => void;
}

export type SelectedCards = {
  selectedIds: number[];
  areSelected: boolean[];
};
