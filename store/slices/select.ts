"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectInitialState } from "@/types/selectInitialState";
import postcards from "@/data/postcards.json";

const initialState: SelectInitialState = {
  selectedCardsIds: [],
  checkedCards: new Array(postcards.length).fill(false),
};

export const selectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    setSelectedCardsIds: (state, action: PayloadAction<number[]>) => {
      state.selectedCardsIds = action.payload;
    },
    setCheckedCards: (state, action: PayloadAction<boolean[]>) => {
      state.checkedCards = action.payload;
    },
  },
});

export const selectActions = selectSlice.actions;
export const selectReducer = selectSlice.reducer;
