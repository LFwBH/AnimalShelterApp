import React, { useCallback, useMemo, useState } from "react";
import { FlatList } from "react-native";

import { fetchArrivals } from "../../api/arrivals";
import { Row } from "../../components/Box";
import { Arrival } from "../../models/Arrivals";
import ArrivalsModal from "./ArrivalsModal";
import ListItem from "./ListItem";

interface ArrivalsListProps {
  filter: {
    from: string;
    to: string;
  };
}

function ArrivalsList({ filter }: ArrivalsListProps) {
  const arrivals = useMemo(() => fetchArrivals(filter), [filter]);

  const [selectedItem, setSelectedItem] = useState<Arrival | null>(null);

  const keyExtractor = useCallback(
    (income: Arrival) => income.id.toString(),
    [],
  );

  const handleSelectItem = useCallback(
    (item: Arrival) => setSelectedItem(item),
    [],
  );

  const handleUnselectItem = useCallback(() => setSelectedItem(null), []);

  const renderItem = useCallback(
    ({ item }: { item: Arrival }) => (
      <ListItem item={item} onPress={handleSelectItem} />
    ),
    [handleSelectItem],
  );

  const renderSeparator = useCallback(() => <Row p={2} />, []);

  return (
    <>
      <FlatList<Arrival>
        data={arrivals}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />

      <ArrivalsModal
        isVisible={!!selectedItem}
        arrival={selectedItem ?? undefined}
        onClose={handleUnselectItem}
      />
    </>
  );
}

export default ArrivalsList;
