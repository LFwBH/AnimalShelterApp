import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useCallback, useMemo } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { useInfiniteQuery } from "react-query";

import { fetchPetList, PETS_KEY } from "../../api/pets";
import Box from "../../components/Box";
import FullScreenError from "../../components/FullScreenError";
import FullScreenLoading from "../../components/FullScreenLoading";
import { Pet } from "../../models/Pet";
import { RootStackParamList } from "../../types/navigation";
import Item from "./Item";

interface PetsScreenProps
  // TODO: should be "Pets" instead of "Pet", but this doesn't allow to navigate
  extends BottomTabScreenProps<RootStackParamList, "Pet"> {}

export default function PetsScreen({ navigation }: PetsScreenProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    remove,
    isFetching,
    isFetched,
    isError,
    status,
  } = useInfiniteQuery(PETS_KEY, fetchPetList, {
    getNextPageParam: ({ page }) => page?.next,
  });

  const handlePressPet = useCallback(
    (pet: Pet) => {
      navigation.navigate("Pet", {
        petId: pet.id,
        petName: pet.name,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Pet }) => {
      return <Item pet={item} onPress={handlePressPet} />;
    },
    [handlePressPet],
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const handleLoadNextPage = useCallback(() => {
    if (hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage]);

  const handleRefresh = useCallback(() => {
    remove();
    refetch();
  }, [refetch, remove]);

  const pets = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      acc.push(...page.body);
      return acc;
    }, [] as Pet[]);
  }, [data?.pages]);

  let content: JSX.Element | null = null;

  if ((isFetching && !isFetched) || (isFetching && status === "error")) {
    content = <FullScreenLoading />;
  } else if (!isError) {
    content = (
      <FlatList<Pet>
        data={pets}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadNextPage}
        refreshing={isFetchingNextPage}
        onRefresh={handleRefresh}
      />
    );
  } else {
    content = <FullScreenError />;
  }

  return (
    <Box as={SafeAreaView} flex={1}>
      {content}
    </Box>
  );
}
