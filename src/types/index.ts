export type CardType = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  addButton: string;
  addedButton: string;
};

export type OrderData = {
  selectedPostcards: string[];
  userComment: string;
  userEmail: string;
  userName: string;
  userPhone: string | number | readonly string[] | undefined;
};

export type SelectedCards = {
  selectedIds: number[];
  areSelected: boolean[];
};

export type SelectInitialState = {
  selectedCardsIds: number[];
  checkedCards: boolean[];
};

export interface PostcardProps {
  updateCardsData: (selectionMap: Record<number, boolean>) => void;
}
