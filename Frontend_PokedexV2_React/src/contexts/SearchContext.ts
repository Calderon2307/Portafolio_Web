import { createContext } from 'react';
import {
  SearchLabelContextType,
  UpdateSearchLabelContextType,
  SearchItemContextType,
  UpdateSearchItemContextType,
} from '@/types/types';

export const SearchLabelContext = createContext<SearchLabelContextType>('');

export const UpdateSearchLabelContext =
  createContext<UpdateSearchLabelContextType>(() => {});

export const SearchItemContext = createContext<SearchItemContextType>('');

export const UpdateSearchItemContext =
  createContext<UpdateSearchItemContextType>(() => {});
