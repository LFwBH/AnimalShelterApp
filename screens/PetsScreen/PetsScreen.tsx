import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import _ from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useInfiniteQuery } from "react-query";

import { fetchPetList, filter, PETS_KEY } from "../../api/pets";
import Box, { Col, Row } from "../../components/Box";
import FullScreenError from "../../components/FullScreenError";
import FullScreenLoading from "../../components/FullScreenLoading";
import i18n from "../../i18n";
import { Pet } from "../../models/Pet";
import { RootStackParamList } from "../../types/navigation";
import Item from "./Item";

enum PET_KIND {
  ALL,
  BOY,
  GIRL,
}

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
  } = useInfiniteQuery([PETS_KEY, "Kathy", "Kathy"], fetchPetList, {
    getNextPageParam: ({ data: pets }) => _.last(pets)?.id,
  });

  const PET_KIND_ALIAS = useMemo(
    () => ({
      [PET_KIND.BOY]: i18n("pet.kind.boy"),
      [PET_KIND.GIRL]: i18n("pet.kind.girl"),
    }),
    [],
  );

  const [search, setSearch] = useState("");
  const [petsArray, setPetsArray] = useState([] as Pet[]);
  const [kind, setKind] = useState(PET_KIND.ALL);

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

  const values = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      acc.push(...page.data);
      return acc;
    }, [] as Pet[]);
  }, [data?.pages]);

  const pets = useMemo(() => {
    return values?.filter((item) => {
      let kindFlag = true;
      let searchFlag = true;

      if (search) {
        searchFlag = item.name.toLowerCase().includes(search.toLowerCase());
      }

      if (kind === PET_KIND.BOY || kind === PET_KIND.GIRL) {
        kindFlag = item.sex
          .toLowerCase()
          .includes(PET_KIND_ALIAS[kind].toLowerCase());
      }

      return searchFlag && kindFlag;
    });
  }, [PET_KIND_ALIAS, kind, search, values]);

  useEffect(() => {
    if (pets) {
      setPetsArray(pets);
    }
  }, [pets]);

  let content: JSX.Element | null = null;

  const handleChangeSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  const handleFilterBoys = useCallback(async () => {
    const filteredArray = await filter();
    setPetsArray(filteredArray.data as Pet[]);
    console.log(filteredArray.data);
    if (kind === PET_KIND.BOY) {
      setKind(PET_KIND.ALL);
      return;
    }

    setKind(PET_KIND.BOY);
  }, [kind]);

  const handleFilterGirls = useCallback(() => {
    if (kind === PET_KIND.GIRL) {
      setKind(PET_KIND.ALL);
      return;
    }

    setKind(PET_KIND.GIRL);
  }, [kind]);

  if ((isFetching && !isFetched) || (isFetching && status === "error")) {
    content = <FullScreenLoading />;
  } else if (!isError) {
    content = (
      <FlatList<Pet>
        data={petsArray}
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
    <Box as={SafeAreaView} flex={1}>
      <SearchBar
        placeholder={`${i18n("pets.search")}...`}
        onChangeText={handleChangeSearch}
        value={search}
        lightTheme
        round
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomColor: "transparent",
        }}
      />
      <Row mx={10} pb={10}>
        <Col mr={2}>
          <Button TouchableComponent={TouchableWithoutFeedback} title="..." />
        </Col>
        <Col mr={2}>
          <Button
            TouchableComponent={TouchableWithoutFeedback}
            type={kind === PET_KIND.BOY ? "outline" : "solid"}
            title={i18n("pet.kind.boy")}
            onPress={handleFilterBoys}
          />
        </Col>
        <Col>
          <Button
            TouchableComponent={TouchableWithoutFeedback}
            type={kind === PET_KIND.GIRL ? "outline" : "solid"}
            title={i18n("pet.kind.girl")}
            onPress={handleFilterGirls}
          />
        </Col>
      </Row>
      {content}
    </Box>
  );
}
