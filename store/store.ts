"use client";

import { configureStore } from "@reduxjs/toolkit";
import { selectReducer } from "./slices/select";

export const store = configureStore({
  reducer: {
    selector: selectReducer,
  },
});

// Gives a type to the whole store
export type RootState = ReturnType<typeof store.getState>;
