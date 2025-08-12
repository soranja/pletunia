export type TContext = {
  selectedCardIds: number[];
  checkedCards: boolean[];
  toggleById: (id: number) => void;
  clearAll: () => void;
};
