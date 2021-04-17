import { StackScreenProps } from "@react-navigation/stack";
import lowerFirst from "lodash/lowerFirst";
import React, { useCallback } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { useQuery } from "react-query";

import { fetchPetById, PET_KIND, PET_KIND_ALIAS } from "../../api/pets";
import Box from "../../components/Box";
import FullScreenError from "../../components/FullScreenError";
import FullScreenLoading from "../../components/FullScreenLoading";
import Text from "../../components/Text";
import { useTheme } from "../../constants/styled-components";
import i18n from "../../i18n";
import { Pet } from "../../models/Pet";
import { RootStackParamList } from "../../types/navigation";

interface PetScreenProps extends StackScreenProps<RootStackParamList, "Pet"> {}

export default function PetScreen({ route, navigation }: PetScreenProps) {
  const theme = useTheme();

  const { petId } = route.params;

  const { data, isLoading, isError } = useQuery(["pets", petId], () =>
    fetchPetById({ petId }),
  );

  const handleCatForm = useCallback(() => {
    navigation.navigate("CatFormScreen");
  }, [navigation]);

  const handleDogForm = useCallback(() => {
    navigation.navigate("DogFormScreen");
  }, [navigation]);

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = <FullScreenLoading />;
  } else if (!isError) {
    const pet = data?.data as NonNullable<Pet>;

    const original = pet.image?.original;

    content = (
      <ScrollView contentContainerStyle={{ paddingBottom: theme.space[3] }}>
        <Box as={Card} containerStyle={{ padding: 0 }}>
          <Box mb={2}>
            <Card.Image
              borderRadius={2}
              source={{
                uri: `https://placeimg.com/1920/1080/animals?${Date.now()}`,
              }}
              style={{
                width: theme.layout.window.width - theme.space[2] * 2,
                height: original?.height ?? 500 / 2,
              }}
              resizeMode="cover"
              PlaceholderContent={<ActivityIndicator />}
            />
          </Box>
          <Box p={2} pt={0}>
            <Text fontSize="lg">{pet.name}</Text>
            <Box mt={3} />
            <Text>
              {i18n("pet.age")}: {pet.age}
            </Text>
            <Text>
              {i18n("pet.color")}: {pet.color}
            </Text>
            <Text>
              {i18n("pet.sex")}: {i18n(`pet.sexType.${lowerFirst(pet.sex)}`)}
            </Text>
            <Box mt={3} />
            <Text>{pet.description}</Text>
            <Box mt={3} />
            <Card.Divider />
          </Box>
          <Box
            width={1}
            display="flex"
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
            p={2}
            pt={0}
          >
            {pet.kind === PET_KIND_ALIAS[PET_KIND.CAT] && (
              <Box alignItems="flex-end">
                <Button
                  title="Заполнить анкету"
                  type="clear"
                  onPress={handleCatForm}
                />
              </Box>
            )}
            {pet.kind === PET_KIND_ALIAS[PET_KIND.DOG] && (
              <Box alignItems="flex-end">
                <Button
                  title="Заполнить анкету"
                  type="clear"
                  onPress={handleDogForm}
                />
              </Box>
            )}
            <Icon
              color={theme.palette.accentDark}
              type="antdesign"
              name="hearto"
              reverse
              raised
            />
          </Box>
        </Box>
      </ScrollView>
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
