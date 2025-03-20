export type SearchLabelContextType =
  | 'Pokemon'
  | 'Type'
  | 'Region'
  | 'Item'
  | '';

export type UpdateSearchLabelContextType = (
  label: SearchLabelContextType,
) => void;

export type SearchItemContextType = string;

export type UpdateSearchItemContextType = (item: SearchItemContextType) => void;
