export interface FilterType {
  exname: string;
  excost: number;
}

export interface SearchArray {
  rows: Array<FilterType>;
}
