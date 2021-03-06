import { Ionicons } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import filter from "lodash/filter";
import last from "lodash/last";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView } from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

import {
  archivePet,
  fetchPetList,
  PET_KIND,
  PET_SEX,
  PETS_KEY,
} from "../../api/pets";
import Box, { Col, Row } from "../../components/Box";
import Button from "../../components/Button";
import FullScreenLoading from "../../components/FullScreenLoading";
import Text from "../../components/Text";
import { useTheme } from "../../constants/styled-components";
import { AppContext } from "../../context/context";
import i18n from "../../i18n";
import { Pet } from "../../models/Pet";
import { RootStackParamList } from "../../types/navigation";
import Item from "./Item";

interface PetsScreenProps
  extends BottomTabScreenProps<RootStackParamList, "Pets"> {}

export default function PetsScreen({ navigation, route }: PetsScreenProps) {
  const theme = useTheme();

  const { user } = useContext(AppContext);

  const { favorites } = route.params ?? {};

  const [search, setSearch] = useState("");
  const [kind, setKind] = useState<PET_KIND | null>(null);
  const [sex, setSex] = useState<PET_SEX | null>(null);

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

  const archivePetMutation = useMutation(
    ({ petId }: { petId: number }) => archivePet({ petId }),
    { onSuccess: () => queryClient.invalidateQueries(PETS_KEY) },
  );

  const handleRedirectToLogin = useCallback(async () => {
    if (!user?.token) {
      navigation.navigate("Login");
    }
  }, [navigation, user?.token]);

  const handlePressPet = useCallback(
    (pet: Pet) => {
      navigation.navigate("Pet", {
        petId: pet.id,
        petName: pet.name,
        favorite: favorites,
      });
    },
    [navigation, favorites],
  );

  const handlePressAddPet = useCallback(() => {
    navigation.navigate("AddPet");
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: Pet }) => {
      function handleArchivePet() {
        archivePetMutation.mutate({ petId: item.id });
      }

      return (
        <Item
          pet={item}
          onPress={handlePressPet}
          onArchive={handleArchivePet}
        />
      );
    },
    [archivePetMutation, handlePressPet],
  );

  const keyExtractor = useCallback((pet: Pet) => pet.id.toString(), []);

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

  const handleChangeSearch = (value: string) => setSearch(value);

  const handleFilterBoys = () => {
    if (sex === PET_SEX.BOY) {
      setSex(null);
    } else {
      setSex(PET_SEX.BOY);
    }
  };

  const handleFilterGirls = () => {
    if (sex === PET_SEX.GIRL) {
      setSex(null);
    } else {
      setSex(PET_SEX.GIRL);
    }
  };

  const handleFilterCats = () => {
    if (kind === PET_KIND.CAT) {
      setKind(null);
    } else {
      setKind(PET_KIND.CAT);
    }
  };

  const handleFilterDogs = () => {
    if (kind === PET_KIND.DOG) {
      setKind(null);
    } else {
      setKind(PET_KIND.DOG);
    }
  };

  const content =
    (isFetching && !isFetched) || (isFetching && status === "error") ? (
      <FullScreenLoading />
    ) : (
      <FlatList<Pet>
        data={filter(pets, ["archived", false])}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadNextPage}
        refreshing={isFetchingNextPage}
        onRefresh={handleRefresh}
        contentContainerStyle={{
          paddingBottom: !pets?.length ? 0 : theme.space[3],
          flex: !pets?.length ? 1 : undefined,
          minHeight: "100%",
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

  return (
    <Box flex={1} primary>
      <Box
        flex={1}
        background
        borderTopLeftRadius={18}
        borderTopRightRadius={18}
      >
        {!user?.token && favorites ? (
          <Row p={3} flex={1} alignItems="center" justifyContent="center">
            <Box>
              <Button
                round
                buttonStyle={{
                  paddingVertical: theme.space[2],
                  paddingHorizontal: theme.space[4],
                }}
                title={
                  <>
                    <Text fontSize="lg" background>
                      {i18n("login.title")}
                    </Text>
                    <Box p={1} />
                    <Ionicons
                      style={{ color: "white" }}
                      size={32}
                      name="ios-enter-outline"
                    />
                  </>
                }
                onPress={handleRedirectToLogin}
              />
            </Box>
          </Row>
        ) : (
          <>
            {!favorites && (
              <>
                <SearchBar
                  platform="default"
                  placeholder={`${i18n("pets.search")}`}
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
                <Row mx={10}>
                  <ScrollView
                    indicatorStyle="black"
                    contentContainerStyle={{ paddingBottom: 8 }}
                    horizontal
                  >
                    <Col mr={2}>
                      <Button
                        round
                        width={120}
                        variant={sex === PET_SEX.BOY ? "secondary" : "primary"}
                        title={i18n("pet.sexType.boy")}
                        onPress={handleFilterBoys}
                      />
                    </Col>
                    <Col mr={2}>
                      <Button
                        round
                        width={120}
                        variant={sex === PET_SEX.GIRL ? "secondary" : "primary"}
                        title={i18n("pet.sexType.girl")}
                        onPress={handleFilterGirls}
                      />
                    </Col>
                    <Col mr={2}>
                      <Button
                        round
                        width={120}
                        variant={
                          kind === PET_KIND.CAT ? "secondary" : "primary"
                        }
                        title={i18n("pet.kindType.cat")}
                        onPress={handleFilterCats}
                      />
                    </Col>
                    <Col>
                      <Button
                        round
                        width={120}
                        variant={
                          kind === PET_KIND.DOG ? "secondary" : "primary"
                        }
                        title={i18n("pet.kindType.dog")}
                        onPress={handleFilterDogs}
                      />
                    </Col>
                  </ScrollView>
                </Row>
              </>
            )}
            {content}
          </>
        )}
      </Box>
      <Box flex={1} position="absolute" right={0} bottom={0}>
        <Pressable onPress={handlePressAddPet}>
          <Icon
            color={theme.palette.warning}
            type="antdesign"
            name="plus"
            reverse
            raised
          />
        </Pressable>
      </Box>
    </Box>
  );
}
