export interface FilterType {
  exname: string;
  excost: string;
}

export interface SearchArray {
  rows: Array<FilterType>;
}
