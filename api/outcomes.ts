import faker from "faker/locale/ru";
import random from "lodash/random";
import range from "lodash/range";
import { DateTime, Interval } from "luxon";

import { OutcomeGroup } from "../models/Outcome";

interface OutcomesFilter {
  from: string;
  to: string;
}

export function fetchOutcomes({ from, to }: OutcomesFilter): OutcomeGroup[] {
  const diff = Interval.fromISO(`${from}/${to}`);
  const days = diff.count("days");
  return range(0, days).map((index) => {
    const day = DateTime.fromISO(from).plus({ days: index }).toISODate();

    const outcomesSize = random(1, 10);
    const outcomes = range(0, outcomesSize).map((subIndex) => ({
      id: subIndex,
      date: day,
      amount: random(100, 1000),
      where: faker.address.streetName(),
      description: "",
    }));

    return {
      id: index,
      date: day,
      outcomes,
    };
  });
}
