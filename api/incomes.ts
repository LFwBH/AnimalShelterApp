import faker from "faker/locale/ru";
import random from "lodash/random";
import range from "lodash/range";
import { DateTime, Interval } from "luxon";

import { IncomeGroup } from "../models/Income";

interface IncomesFilter {
  from: string;
  to: string;
}

export function fetchIncomes({ from, to }: IncomesFilter): IncomeGroup[] {
  const diff = Interval.fromISO(`${from}/${to}`);
  const days = diff.count("days");
  return range(0, days).map((index) => {
    const day = DateTime.fromISO(from).plus({ days: index }).toISODate();

    const incomesSize = random(1, 10);
    const incomes = range(0, incomesSize).map((subIndex) => ({
      id: subIndex,
      date: day,
      amount: random(100, 1000),
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
    }));

    return {
      id: index,
      date: day,
      incomes,
    };
  });
}
