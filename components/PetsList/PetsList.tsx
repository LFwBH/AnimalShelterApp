import last from "lodash/last";
import noop from "lodash/noop";
import React, { useCallback, useContext, useMemo } from "react";
import { FlatList } from "react-native";
import { useInfiniteQuery } from "react-query";

import { fetchPetList, PET_KIND, PET_SEX, PETS_KEY } from "../../api/pets";
import { Col, Row } from "../../components/Box";
import FullScreenLoading from "../../components/FullScreenLoading";
import Text from "../../components/Text";
import { useTheme } from "../../constants/styled-components";
import { AppContext } from "../../context/context";
import i18n from "../../i18n";
import { Pet } from "../../models/Pet";
import ListItem from "./ListItem";

interface PetsListProps {
  search?: string;
  kind?: PET_KIND | null;
  sex?: PET_SEX | null;
  favorites?: boolean;
  onPressPet?: (pet: Pet) => void;
}

function PetsList({
  search = "",
  kind = null,
  sex = null,
  favorites = false,
  onPressPet = noop,
}: PetsListProps) {
  const theme = useTheme();

  const { user } = useContext(AppContext);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    remove,
    isFetching,
    isFetched,
    status,
  } = useInfiniteQuery(
    [PETS_KEY, { search, kind, sex, favorites }],
    (args) => {
      return fetchPetList({
        ...args,
        name: search,
        kind: kind ?? undefined,
        sex: sex ?? undefined,
        favorites,
      });
    },
    {
      enabled: favorites ? !!user?.token : true,
      getNextPageParam: ({ data: pets }) => last(pets)?.id,
    },
  );

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
      acc.push(...page.data);
      return acc;
    }, [] as Pet[]);
  }, [data?.pages]);

  const renderItem = useCallback(
    ({ item }: { item: Pet }) => {
      return <ListItem pet={item} onPress={onPressPet} />;
    },
    [onPressPet],
  );

  const keyExtractor = useCallback((pet: Pet) => pet.id.toString(), []);

  const content =
    (isFetching && !isFetched) || (isFetching && status === "error") ? (
      <FullScreenLoading />
    ) : (
      <FlatList<Pet>
        data={pets}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadNextPage}
        refreshing={isFetchingNextPage}
        onRefresh={handleRefresh}
        contentContainerStyle={{
          paddingBottom: !pets?.length ? 0 : theme.space[3],
          flex: !pets?.length ? 1 : undefined,
        }}
        ListEmptyComponent={
          <Row justifyContent="center" alignItems="center" flex={1}>
            <Col>
              <Row mb={2}>
                <Text fontSize={22}>{i18n("common.emptyList")}</Text>
              </Row>
              <Row justifyContent="center">
                <Text fontSize={48}>😔</Text>
              </Row>
            </Col>
          </Row>
        }
      />
    );

  return content;
}

export default PetsList;
