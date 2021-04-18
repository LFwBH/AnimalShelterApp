import { StackScreenProps } from "@react-navigation/stack";
import lowerFirst from "lodash/lowerFirst";
import React, { useCallback } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import { Button, Card } from "react-native-elements";
import { useQuery } from "react-query";

import { fetchPetById, PET_KIND, PET_KIND_ALIAS } from "../../api/pets";
import Box from "../../components/Box";
import FullScreenError from "../../components/FullScreenError";
import FullScreenLoading from "../../components/FullScreenLoading";
import Text from "../../components/Text";
import { PET_IMAGE_API } from "../../constants/api";
import i18n from "../../i18n";
import { Pet } from "../../models/Pet";
import { RootStackParamList } from "../../types/navigation";

interface PetScreenProps extends StackScreenProps<RootStackParamList, "Pet"> {}

export default function PetScreen({ route, navigation }: PetScreenProps) {
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

    const original = pet.image?.original;

    content = (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "#6B96E4",
          elevation: 0,
          shadowColor: "#6B96E4",
        }}
      >
        <Box
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Card
            containerStyle={{
              padding: 0,
              backgroundColor: "none",
              width: "100%",
              elevation: 0,
              shadowColor: "#fff",
              alignSelf: "center",
              height: "100%",
              borderColor: "#fff",
              marginTop: 33,
            }}
          >
            <Box style={{ padding: 10, paddingTop: 0, alignSelf: "center" }}>
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
            <Box p={2} pt={0}>
              <Text
                fontSize="lg"
                style={{
                  fontWeight: "bold",
                  alignSelf: "center",
                  paddingBottom: 10,
                }}
              >
                {pet.name}
              </Text>
              <Card.Divider
                style={{
                  width: "110%",
                  marginLeft: -10,
                  elevation: 1,
                  opacity: 0.5,
                }}
              />
              <Box style={{ display: "flex", flexDirection: "row" }}>
                <Box style={{ paddingLeft: 15 }}>
                  <Text>{i18n("pet.age")}:</Text>
                  <Text>{i18n("pet.kind")}:</Text>
                  <Text>{i18n("pet.sex")}:</Text>
                  <Text>{i18n("pet.color")}:</Text>
                  <Text>{i18n("pet.passport")}:</Text>
                  <Text>{i18n("pet.sterilization")}:</Text>
                  <Text>{i18n("pet.sterilizationDate")}:</Text>
                  <Text>{i18n("pet.character")}:</Text>
                  <Text>{i18n("pet.from")}:</Text>
                </Box>
                <Box style={{ paddingLeft: 30, opacity: 0.6 }}>
                  <Text>{pet.age}</Text>
                  <Text>{pet.color}</Text>
                  <Text>{i18n(`pet.sexType.${lowerFirst(pet.sex)}`)}</Text>
                  <Text>{pet.color}</Text>
                  <Text>{pet.color}</Text>
                  <Text>{pet.color}</Text>
                  <Text>{pet.color}</Text>
                  <Text>{pet.color}</Text>
                  <Text>{pet.color}</Text>
                </Box>
              </Box>
              <Box mt={3} />
              <Text style={{ paddingLeft: 15 }}>{pet.description}</Text>
              <Box mt={3} />
              <Card.Divider
                style={{
                  width: "110%",
                  marginLeft: -10,
                  elevation: 1,
                  opacity: 0.5,
                }}
              />
            </Box>
            <Box
              width={1}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={20}
              pt={0}
            >
              {pet.kind === PET_KIND_ALIAS[PET_KIND.CAT] && (
                <Box>
                  <Button
                    title="Заполнить Анкету"
                    type="clear"
                    onPress={handleCatForm}
                    buttonStyle={{
                      borderWidth: 1,
                      borderColor: "#FFBC61",
                      width: 240,
                    }}
                    titleStyle={{ color: "#FFBC61" }}
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
                      borderColor: "#FFBC61",
                      width: 240,
                    }}
                    titleStyle={{ color: "#FFBC61" }}
                  />
                </Box>
              )}
            </Box>
          </Card>
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
