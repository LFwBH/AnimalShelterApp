import React, { useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import { useInfiniteQuery } from "react-query";

import { fetchPetList, PETS_KEY } from "../../api/pets";
import Box from "../../components/Box";
import Text from "../../components/Text";
import { useTheme } from "../../constants/styled-components";
import i18n from "../../i18n";
import { Pet } from "../../models/Pet";
import Item from "./Item";

export default function PetsScreen() {
  const theme = useTheme();

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
    getNextPageParam: (lastPage) => lastPage.page?.next ?? 0,
  });

  const renderItem = useCallback(({ item }: { item: Pet }) => {
    return <Item pet={item} />;
  }, []);

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
    content = (
      <Box
        display="flex"
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <ActivityIndicator size="large" color={theme.palette.primary} />
      </Box>
    );
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
    content = (
      <Box
        display="flex"
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Text>{i18n("common.error")} :(</Text>
      </Box>
    );
  }

  return (
    <Box as={SafeAreaView} flex={1}>
      {content}
    </Box>
  );
}
