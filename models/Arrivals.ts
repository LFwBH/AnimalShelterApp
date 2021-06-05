export interface Arrival {
  id: number;
  date: string;
  count: {
    cats: number;
    dogs: number;
  };
}
