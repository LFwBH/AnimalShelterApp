import { StackScreenProps } from "@react-navigation/stack";
import lowerFirst from "lodash/lowerFirst";
import React, { useCallback } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import { Button, Card } from "react-native-elements";
import { useQuery } from "react-query";

import { fetchPetById, PET_KIND, PET_KIND_ALIAS } from "../../api/pets";
import Box, { Row } from "../../components/Box";
import FullScreenError from "../../components/FullScreenError";
import FullScreenLoading from "../../components/FullScreenLoading";
import Text from "../../components/Text";
import { PET_IMAGE_API } from "../../constants/api";
import { useTheme } from "../../constants/styled-components";
import { boolToString } from "../../helpers/boolToString";
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
    navigation.navigate("CatForm");
  }, [navigation]);

  const handleDogForm = useCallback(() => {
    navigation.navigate("DogForm");
  }, [navigation]);

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = <FullScreenLoading />;
  } else if (!isError) {
    const pet = data?.data as NonNullable<Pet>;

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
            <Box>
              <Text textAlign="center" fontSize="lg" fontWeight="semi" p={3}>
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
                  <Text>{i18n("pet.passport")}:</Text>
                  <Text>{i18n("pet.sterilization")}:</Text>
                  {pet.sterilized && (
                    <Text>{i18n("pet.sterilizationDate")}:</Text>
                  )}
                  <Text>{i18n("pet.from")}:</Text>
                </Box>
                <Box flex={1} pl={30} opacity={0.6}>
                  <Text>{pet.age}</Text>
                  <Text>{pet.color}</Text>
                  <Text>{i18n(`pet.sexType.${lowerFirst(pet.sex)}`)}</Text>
                  <Text>{pet.color}</Text>
                  <Text>{boolToString(pet.passport)}</Text>
                  <Text>{boolToString(pet.sterilized)}</Text>
                  {pet.sterilized && (
                    <Text>
                      {new Date(pet.sterilizationDate).toLocaleString("ru")}
                    </Text>
                  )}
                  <Row flex={1}>
                    <Text flex={1} flexWrap="wrap" numberOfLines={2}>
                      {pet.cameFrom}
                    </Text>
                  </Row>
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
          </ScrollView>
        </Card>
      </Box>
    );
  } else {
    content = <FullScreenError />;
  }

  return (
    <Box as={SafeAreaView} flex={1} backgroundColor={theme.palette.primary}>
      {content}
    </Box>
  );
}
