import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useQuery } from "react-query";

import { fetchIncomes, INCOMES_KEY } from "../../api/incomes";
import { Row } from "../../components/Box";
import { IncomeGroup } from "../../models/Income";
import IncomesModal from "./IncomesModal";
import ListItem from "./ListItem";

interface IncomesListProps {
  timestamp: number;
  filter: {
    from: string;
    to: string;
  };
}

function IncomesList({ filter, timestamp }: IncomesListProps) {
  const { data: incomes } = useQuery([INCOMES_KEY, filter], () =>
    fetchIncomes(filter),
  );

  const [selectedItem, setSelectedItem] = useState<IncomeGroup | null>(null);

  const keyExtractor = useCallback(
    (income: IncomeGroup) => income.id.toString(),
    [],
  );

  const handleSelectItem = useCallback(
    (item: IncomeGroup) => setSelectedItem(item),
    [],
  );

  const handleUnselectItem = useCallback(() => setSelectedItem(null), []);

  const renderItem = useCallback(
    ({ item }: { item: IncomeGroup }) => (
      <ListItem item={item} onPress={handleSelectItem} />
    ),
    [handleSelectItem],
  );

  const renderSeparator = useCallback(() => <Row p={2} />, []);

  return (
    <>
      <FlatList<IncomeGroup>
        key={timestamp}
        data={incomes}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />

      <IncomesModal
        isVisible={!!selectedItem}
        income={selectedItem ?? undefined}
        onClose={handleUnselectItem}
      />
    </>
  );
}

export default IncomesList;
