import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import last from "lodash/last";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import { useInfiniteQuery } from "react-query";

import { fetchLostPetList, LOST_PETS_KEY } from "../../api/lost";
import Box from "../../components/Box";
import FullScreenError from "../../components/FullScreenError";
import FullScreenLoading from "../../components/FullScreenLoading";
import { useTheme } from "../../constants/styled-components";
import i18n from "../../i18n";
import { LostPet } from "../../models/LostPet";
import { RootStackParamList } from "../../types/navigation";
import Item from "./Item";

interface LostPetsScreenProps
  extends BottomTabScreenProps<RootStackParamList, "LostPets"> {}

export default function LostPetsScreen({ navigation }: LostPetsScreenProps) {
  const theme = useTheme();

  const [search, setSearch] = useState("");

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
  } = useInfiniteQuery(
    [LOST_PETS_KEY, { search }],
    (args) => {
      return fetchLostPetList({
        ...args,
        description: search,
      });
    },
    {
      getNextPageParam: ({ data: pets }) => last(pets)?.id,
    },
  );

  const handlePressPet = useCallback(
    (pet: LostPet) => {
      navigation.navigate("LostPet", { petId: pet.id });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: LostPet }) => {
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
      acc.push(...page.data);
      return acc;
    }, [] as LostPet[]);
  }, [data?.pages]);

  let content: JSX.Element | null = null;

  const handleChangeSearch = (value: string) => setSearch(value);

  if ((isFetching && !isFetched) || (isFetching && status === "error")) {
    content = <FullScreenLoading />;
  } else if (!isError) {
    content = (
      <FlatList<LostPet>
        data={pets}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadNextPage}
        refreshing={isFetchingNextPage}
        onRefresh={handleRefresh}
        contentContainerStyle={{ marginTop: -10 }}
      />
    );
  } else {
    content = <FullScreenError />;
  }

  return (
    <Box
      as={SafeAreaView}
      flex={1}
      style={{ backgroundColor: "#6B96E4", paddingBottom: 60, marginTop: -1 }}
    >
      <Box
        style={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <SearchBar
          // @ts-expect-error ts(2322)
          placeholder={`${i18n("pets.search")}...`}
          onChangeText={handleChangeSearch}
          value={search}
          lightTheme
          round
          searchIcon={
            <Icon
              color="gray"
              type="antdesign"
              name="search1"
              style={{ opacity: 0.5 }}
            />
          }
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: "transparent",
          }}
          inputContainerStyle={{
            backgroundColor: "white",
            height: 40,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#6B96E4",
          }}
        />
        {content}
      </Box>
    </Box>
  );
}
