export interface APIResponse<T> {
  body: T;
  page: {
    first: number;
    next: number;
    last: number;
  };
}
