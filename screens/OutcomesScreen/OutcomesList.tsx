import React, { useCallback, useMemo, useState } from "react";
import { FlatList } from "react-native";

import { fetchOutcomes } from "../../api/outcomes";
import { Row } from "../../components/Box";
import { OutcomeGroup } from "../../models/Outcome";
import ListItem from "./ListItem";
import OutcomesModal from "./OutcomesModal";

interface OutcomesListProps {
  filter: {
    from: string;
    to: string;
  };
}

function OutcomesList({ filter }: OutcomesListProps) {
  const outcomes = useMemo(() => fetchOutcomes(filter), [filter]);

  const [selectedItem, setSelectedItem] = useState<OutcomeGroup | null>(null);

  const keyExtractor = useCallback(
    (income: OutcomeGroup) => income.id.toString(),
    [],
  );

  const handleSelectItem = useCallback(
    (item: OutcomeGroup) => setSelectedItem(item),
    [],
  );

  const handleUnselectItem = useCallback(() => setSelectedItem(null), []);

  const renderItem = useCallback(
    ({ item }: { item: OutcomeGroup }) => (
      <ListItem item={item} onPress={handleSelectItem} />
    ),
    [handleSelectItem],
  );

  const renderSeparator = useCallback(() => <Row p={2} />, []);

  return (
    <>
      <FlatList<OutcomeGroup>
        data={outcomes}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />

      <OutcomesModal
        isVisible={!!selectedItem}
        outcome={selectedItem ?? undefined}
        onClose={handleUnselectItem}
      />
    </>
  );
}

export default OutcomesList;
