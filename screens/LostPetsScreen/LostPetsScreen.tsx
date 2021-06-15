import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import filter from "lodash/filter";
import last from "lodash/last";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList } from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

import { fetchLostPetList, LOST_PETS_KEY } from "../../api/lost";
import { archiveLostPet } from "../../api/pets";
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

  const queryClient = useQueryClient();

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

  const archiveLostPetMutation = useMutation(
    ({ lostPetId }: { lostPetId: number }) => archiveLostPet({ lostPetId }),
    { onSuccess: () => queryClient.invalidateQueries(LOST_PETS_KEY) },
  );

  const handlePressPet = useCallback(
    (pet: LostPet) => {
      navigation.navigate("LostPet", { petId: pet.id });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: LostPet }) => {
      function handleArchiveLostPet() {
        archiveLostPetMutation.mutate({ lostPetId: item.id });
      }

      return (
        <Item
          pet={item}
          onPress={handlePressPet}
          onDelete={handleArchiveLostPet}
        />
      );
    },
    [archiveLostPetMutation, handlePressPet],
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
        data={filter(pets, ["archived", false])}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadNextPage}
        refreshing={isFetchingNextPage}
        onRefresh={handleRefresh}
        contentContainerStyle={{ paddingBottom: theme.space[3] }}
      />
    );
  } else {
    content = <FullScreenError />;
  }

  return (
    <Box flex={1} primary>
      <Box
        flex={1}
        background
        borderTopLeftRadius={18}
        borderTopRightRadius={18}
      >
        <SearchBar
          platform="default"
          placeholder={`${i18n("pets.search")}...`}
          onChangeText={handleChangeSearch}
          value={search}
          {...{ lightTheme: true, round: true }}
          searchIcon={
            <Icon
              color={theme.palette.primary}
              type="antdesign"
              name="search1"
            />
          }
          containerStyle={{
            borderTopWidth: 0,
            borderBottomWidth: 0,
            backgroundColor: theme.palette.transparent,
          }}
          inputContainerStyle={{
            backgroundColor: theme.palette.background,
            borderColor: theme.palette.primary,
            height: 40,
            borderWidth: 1,
            borderBottomWidth: 1,
          }}
        />
        {content}
      </Box>
    </Box>
  );
}
