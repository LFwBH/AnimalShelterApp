import React, { useCallback } from "react";
import { FlatList, SafeAreaView, StatusBar } from "react-native";

import Box from "../../components/Box";
import Text from "../../components/Text";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

function Item({ title }: { title: string }) {
  return (
    <Box primary p={18} m={2} borderRadius={2}>
      <Text background fontSize={32}>
        {title}
      </Text>
    </Box>
  );
}

export default function PetsScreen() {
  const renderItem = useCallback(({ item }) => {
    return <Item title={item.title} />;
  }, []);

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <Box as={SafeAreaView} flex={1} mt={StatusBar.currentHeight ?? 0}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </Box>
  );
}
