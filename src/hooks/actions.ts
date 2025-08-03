'use client';

import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { selectActions } from '@/store/slices/select';

// Exports each slice here
const actions = {
  ...selectActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
