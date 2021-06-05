export interface Departure {
  id: number;
  date: string;
  count: {
    cats: number;
    dogs: number;
  };
}
