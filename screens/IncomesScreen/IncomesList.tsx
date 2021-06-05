import React, { useCallback, useMemo, useState } from "react";
import { FlatList } from "react-native";

import { fetchIncomes } from "../../api/incomes";
import { Row } from "../../components/Box";
import { IncomeGroup } from "../../models/Income";
import IncomesModal from "./IncomesModal";
import ListItem from "./ListItem";

interface IncomesListProps {
  filter: {
    from: string;
    to: string;
  };
}

function IncomesList({ filter }: IncomesListProps) {
  const incomes = useMemo(() => fetchIncomes(filter), [filter]);

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
