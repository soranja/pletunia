import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectInitialState } from "../../types/selectInitialState";
import postcards from "../../data/postcards.json";

const initialState: SelectInitialState = {
  selectedCardsIds: new Array(postcards.length).fill(9999),
  // areSelectedCards: new Array(postcards.length).fill(false),
};

export const selectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    setSelectedCards: (state, action: PayloadAction<number[]>) => {
      state.selectedCardsIds = action.payload;
      // state.areSelectedCards = action.payload;
    },
  },
});

export const selectActions = selectSlice.actions;
export const selectReducer = selectSlice.reducer;

console.log("CARDS ARRAY", postcards);
console.log("LENGTH", postcards.length);
