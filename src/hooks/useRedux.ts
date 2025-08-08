'use client';

import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { selectActions } from '@/store/slices/select';
import { RootState } from '@/store/store';

// Exports each slice here
const actions = {
  ...selectActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

// A custom hook to get data from the Redux
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
