import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import _ from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Button, SearchBar } from "react-native-elements";
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
    getNextPageParam: ({ data: pets }) => _.last(pets)?.id,
  });

  const [search, setSearch] = useState('');
  const [catsData, setCatsData] = useState([] as Pet[]);

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
      setCatsData(acc);
      return acc;
    }, [] as Pet[]);
  }, [data?.pages]);

  let content: JSX.Element | null = null;

  const updateSearch = useCallback((search) => {
      setSearch(search)
      const newArr = pets!.filter(function(el) {
         return (el.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
      })
      setCatsData(newArr);
    },
    [search]
  );

  const pressMan = useCallback(() => {
    const sex = 'Мальчик'
    const newArr = pets!.filter(function(el) {
       return (el.sex.name.toLowerCase().indexOf(sex.toLowerCase()) > -1);
    })
    setCatsData(newArr);
  },
  [search]
  );

  const pressWoman = useCallback(() => {
    const sex = 'Девочка'
    const newArr = pets!.filter(function(el) {
       return (el.sex.name.toLowerCase().indexOf(sex.toLowerCase()) > -1);
    })
    setCatsData(newArr);
  },
  [search]
  );

  if ((isFetching && !isFetched) || (isFetching && status === "error")) {
    content = <FullScreenLoading />;
  } else if (!isError) {
    content = (
      <FlatList<Pet>
        data={catsData}
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
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        lightTheme={true}
        round={true}
        containerStyle={{
          backgroundColor: 'none',
          borderBottomColor: '#edeef0',
        }}
      />
      <View  
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
        }}>
        <Button
          title="..."
          type="outline"
          containerStyle={{paddingRight: 10}}
        />
        <Button
          title="Мальчик"
          type="outline"
          containerStyle={{paddingRight: 10}}
          onPress={pressMan}
        />
        <Button
          title="Девочка"
          type="outline"
          containerStyle={{paddingRight: 10}}
          onPress={pressWoman}
        />
      </View> 
      {content}
    </Box>
  );
}
