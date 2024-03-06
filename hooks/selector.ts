"use client"

import { RootState } from "../store/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// A custom hook to get data from the Redux wrapped with types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
