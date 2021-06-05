import React, { useCallback, useMemo, useState } from "react";
import { FlatList } from "react-native";

import { fetchDepartures } from "../../api/departures";
import { Row } from "../../components/Box";
import { Departure } from "../../models/Departure";
import DeparturesModal from "./DeparturesModal";
import ListItem from "./ListItem";

interface DeparturesListProps {
  filter: {
    from: string;
    to: string;
  };
}

function DeparturesList({ filter }: DeparturesListProps) {
  const departures = useMemo(() => fetchDepartures(filter), [filter]);

  const [selectedItem, setSelectedItem] = useState<Departure | null>(null);

  const keyExtractor = useCallback(
    (income: Departure) => income.id.toString(),
    [],
  );

  const handleSelectItem = useCallback(
    (item: Departure) => setSelectedItem(item),
    [],
  );

  const handleUnselectItem = useCallback(() => setSelectedItem(null), []);

  const renderItem = useCallback(
    ({ item }: { item: Departure }) => (
      <ListItem item={item} onPress={handleSelectItem} />
    ),
    [handleSelectItem],
  );

  const renderSeparator = useCallback(() => <Row p={2} />, []);

  return (
    <>
      <FlatList<Departure>
        data={departures}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />

      <DeparturesModal
        isVisible={!!selectedItem}
        departure={selectedItem ?? undefined}
        onClose={handleUnselectItem}
      />
    </>
  );
}

export default DeparturesList;
