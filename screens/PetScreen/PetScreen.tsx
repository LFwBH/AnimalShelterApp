import { StackScreenProps } from "@react-navigation/stack";
import lowerFirst from "lodash/lowerFirst";
import React, { useCallback } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  createFavoritePet,
  deleteFavoritePet,
  fetchPetById,
  PET_KIND,
  PET_KIND_ALIAS,
} from "../../api/pets";
import Box, { Row } from "../../components/Box";
import FullScreenError from "../../components/FullScreenError";
import FullScreenLoading from "../../components/FullScreenLoading";
import Text from "../../components/Text";
import { PET_IMAGE_API } from "../../constants/api";
import { useTheme } from "../../constants/styled-components";
import i18n from "../../i18n";
import { Pet } from "../../models/Pet";
import { RootStackParamList } from "../../types/navigation";

interface PetScreenProps extends StackScreenProps<RootStackParamList, "Pet"> {
  favorite?: boolean;
}

export default function PetScreen({ route, navigation }: PetScreenProps) {
  const theme = useTheme();

  const { petId, favorite } = route.params;

  const queryClient = useQueryClient();

  const petQuery = useQuery(["pets", petId], () => fetchPetById({ petId }));

  const favoriteQuery = useQuery(
    ["pets", petId, favorite],
    () => fetchPetById({ petId, favorite: true }),
    { retry: false },
  );

  const createFavoriteMutation = useMutation(
    () => createFavoritePet({ petId }),
    { onSuccess: () => queryClient.invalidateQueries("pets") },
  );

  const deleteFavoriteMutation = useMutation(
    () => deleteFavoritePet({ petId }),
    { onSuccess: () => queryClient.invalidateQueries("pets") },
  );

  const handleCatForm = useCallback(() => {
    navigation.navigate("CatForm");
  }, [navigation]);

  const handleLikePet = useCallback(
    () => createFavoriteMutation.mutate(),
    [createFavoriteMutation],
  );

  const handleUnlikePet = useCallback(
    () => deleteFavoriteMutation.mutate(),
    [deleteFavoriteMutation],
  );

  const handleUpdatePet = useCallback(() => {
    navigation.navigate("AddPet", { petId });
  }, [navigation, petId]);

  const handleDogForm = useCallback(() => {
    navigation.navigate("DogForm");
  }, [navigation]);

  let content: JSX.Element | null = null;

  if (petQuery.isLoading) {
    content = <FullScreenLoading />;
  } else if (!petQuery.isError) {
    const pet = petQuery.data?.data as NonNullable<Pet>;

    const loading =
      createFavoriteMutation.isLoading || deleteFavoriteMutation.isLoading;

    content = (
      <Box flex={1} background borderRadius={18}>
        <Card
          wrapperStyle={{ flex: 1 }}
          containerStyle={{
            padding: 0,
            margin: 0,
            marginTop: 24,
            flex: 1,
            shadowColor: theme.palette.transparent,
            borderColor: theme.palette.transparent,
          }}
        >
          <ScrollView
            style={{ backgroundColor: theme.palette.background }}
            contentContainerStyle={{
              backgroundColor: theme.palette.background,
            }}
          >
            <Box alignSelf="center">
              <Card.Image
                borderRadius={2}
                source={{ uri: PET_IMAGE_API[pet.kind]?.thumb() }}
                style={{
                  width: 360,
                  height: 300,
                }}
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator />}
              />
            </Box>
            <Box p={3}>
              <Text textAlign="center" fontSize="lg" fontWeight="semi" mb={3}>
                {pet.name}
              </Text>
              <Card.Divider
                style={{
                  elevation: 1,
                  opacity: 0.5,
                }}
              />
              <Row flex={1}>
                <Box pl={15}>
                  <Text>{i18n("pet.age")}:</Text>
                  <Text>{i18n("pet.kind")}:</Text>
                  <Text>{i18n("pet.sex")}:</Text>
                  <Text>{i18n("pet.color")}:</Text>
                </Box>
                <Box flex={1} pl={30} opacity={0.6}>
                  <Text>{pet.age}</Text>
                  <Text>{pet.color}</Text>
                  <Text>{i18n(`pet.sexType.${lowerFirst(pet.sex)}`)}</Text>
                  <Text>{pet.color}</Text>
                </Box>
              </Row>
              <Box mt={3} />
              <Text pl={15}>{pet.description}</Text>
              <Box mt={3} />
              <Card.Divider
                style={{
                  elevation: 1,
                  opacity: 0.5,
                }}
              />
            </Box>
            {false && (
              <Box width={1} display="flex" alignItems="center">
                {pet.kind === PET_KIND_ALIAS[PET_KIND.CAT] && (
                  <Box>
                    <Button
                      title="Заполнить Анкету"
                      type="clear"
                      onPress={handleCatForm}
                      buttonStyle={{
                        borderWidth: 1,
                        borderColor: theme.palette.warning,
                        width: 240,
                      }}
                      titleStyle={{ color: theme.palette.warning }}
                    />
                  </Box>
                )}
                {pet.kind === PET_KIND_ALIAS[PET_KIND.DOG] && (
                  <Box>
                    <Button
                      title="Заполнить Анкету"
                      type="clear"
                      onPress={handleDogForm}
                      buttonStyle={{
                        borderWidth: 1,
                        borderColor: theme.palette.warning,
                        width: 240,
                      }}
                      titleStyle={{ color: theme.palette.warning }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </ScrollView>
          {false && (
            <Box flex={1} position="absolute" right={0} bottom={0}>
              <Icon
                color={theme.palette.secondary}
                type="antdesign"
                name={
                  // eslint-disable-next-line unicorn/no-nested-ternary
                  loading ? "" : favoriteQuery.isSuccess ? "heart" : "hearto"
                }
                reverse
                raised
                onPress={
                  favoriteQuery.isSuccess ? handleUnlikePet : handleLikePet
                }
              />
              {loading && (
                <Row
                  alignItems="center"
                  justifyContent="center"
                  position="absolute"
                  size="100%"
                >
                  <ActivityIndicator color={theme.palette.background} />
                </Row>
              )}
            </Box>
          )}
          {true && (
            <Box flex={1} position="absolute" right={0} bottom={0}>
              <Icon
                color={theme.palette.secondary}
                type="ionicon"
                name="ios-pencil"
                reverse
                raised
                onPress={handleUpdatePet}
              />
              {loading && (
                <Row
                  alignItems="center"
                  justifyContent="center"
                  position="absolute"
                  size="100%"
                >
                  <ActivityIndicator color={theme.palette.background} />
                </Row>
              )}
            </Box>
          )}
        </Card>
      </Box>
    );
  } else {
    content = <FullScreenError />;
  }

  return (
    <Box
      as={SafeAreaView}
      edges={["right", "left", "bottom"]}
      flex={1}
      backgroundColor={theme.palette.primary}
    >
      {content}
    </Box>
  );
}
