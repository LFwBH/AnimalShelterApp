import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import last from "lodash/last";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, SafeAreaView, ScrollView } from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import { useInfiniteQuery } from "react-query";

import { fetchPetList, PET_KIND, PET_SEX, PETS_KEY } from "../../api/pets";
import Box, { Col, Row } from "../../components/Box";
import FullScreenError from "../../components/FullScreenError";
import FullScreenLoading from "../../components/FullScreenLoading";
import { useTheme } from "../../constants/styled-components";
import i18n from "../../i18n";
import { Pet } from "../../models/Pet";
import { RootStackParamList } from "../../types/navigation";
import Item from "./Item";
import { FilterButton } from "./styles";

interface PetsScreenProps
  extends BottomTabScreenProps<RootStackParamList, "Pets"> {}

export default function PetsScreen({ navigation }: PetsScreenProps) {
  const theme = useTheme();

  const [search, setSearch] = useState("");
  const [kind, setKind] = useState<PET_KIND | null>(null);
  const [sex, setSex] = useState<PET_SEX | null>(null);

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
    [PETS_KEY, { search, kind, sex }],
    (args) => {
      return fetchPetList({
        ...args,
        name: search,
        kind: kind ?? undefined,
        sex: sex ?? undefined,
      });
    },
    {
      getNextPageParam: ({ data: pets }) => last(pets)?.id,
    },
  );

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
      acc.push(...page.data);
      return acc;
    }, [] as Pet[]);
  }, [data?.pages]);

  let content: JSX.Element | null = null;

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
        contentContainerStyle={{ paddingBottom: theme.space[3] }}
      />
    );
  } else {
    content = <FullScreenError />;
  }

  return (
    <Box as={SafeAreaView} display="flex" flex={1} primary>
      <Box
        flex={1}
        background
        borderTopLeftRadius={18}
        borderTopRightRadius={18}
      >
        <SearchBar
          // @ts-expect-error ts(2322)
          placeholder={`${i18n("pets.search")}`}
          onChangeText={handleChangeSearch}
          value={search}
          lightTheme
          round
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
              <FilterButton
                active={sex === PET_SEX.BOY}
                title={i18n("pet.sexType.boy")}
                onPress={handleFilterBoys}
              />
            </Col>
            <Col mr={2}>
              <FilterButton
                active={sex === PET_SEX.GIRL}
                title={i18n("pet.sexType.girl")}
                onPress={handleFilterGirls}
              />
            </Col>
            <Col mr={2}>
              <FilterButton
                active={kind === PET_KIND.CAT}
                title={i18n("pet.kindType.cat")}
                onPress={handleFilterCats}
              />
            </Col>
            <Col>
              <FilterButton
                active={kind === PET_KIND.DOG}
                title={i18n("pet.kindType.dog")}
                onPress={handleFilterDogs}
              />
            </Col>
          </ScrollView>
        </Row>
        {content}
      </Box>
    </Box>
  );
}
