import random from "lodash/random";
import range from "lodash/range";
import { DateTime, Interval } from "luxon";

import { Arrival } from "../models/Arrivals";

const LOWER_THRESHOLD = 0;
const UPPER_THRESHOLD = 10;

interface ArrivalsFilter {
  from: string;
  to: string;
}

export function fetchArrivals({ from, to }: ArrivalsFilter): Arrival[] {
  const diff = Interval.fromISO(`${from}/${to}`);
  const days = diff.count("days");
  return range(0, days).map((index) => {
    const day = DateTime.fromISO(from).plus({ days: index }).toISODate();
    const count = {
      cats: random(LOWER_THRESHOLD, UPPER_THRESHOLD),
      dogs: random(LOWER_THRESHOLD, UPPER_THRESHOLD),
    };
    return {
      id: index,
      date: day,
      count,
    };
  });
}
