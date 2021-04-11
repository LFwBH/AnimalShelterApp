import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { useQuery } from "react-query";

import { fetchLostPetById } from "../../api/lost";
import Box from "../../components/Box";
import FullScreenError from "../../components/FullScreenError";
import FullScreenLoading from "../../components/FullScreenLoading";
import Text from "../../components/Text";
import { useTheme } from "../../constants/styled-components";
import { LostPet } from "../../models/LostPet";
import { Pet } from "../../models/Pet";
import { RootStackParamList } from "../../types/navigation";

interface PetScreenProps
  extends StackScreenProps<RootStackParamList, "LostPet"> {}

export default function LostPetScreen({ route, navigation }: PetScreenProps) {
  const theme = useTheme();

  const { petId } = route.params;

  const { data, isLoading, isError } = useQuery(["pets", petId], () =>
    fetchLostPetById({ petId }),
  );

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = <FullScreenLoading />;
  } else if (!isError) {
    const pet = data?.data as NonNullable<LostPet>;

    const original = pet.image?.original;

    content = (
      <ScrollView contentContainerStyle={{ paddingBottom: theme.space[3] }}>
        <Box as={Card} containerStyle={{ padding: 0 }}>
          <Box mb={2}>
            <Card.Image
              borderRadius={2}
              source={{
                uri: `https://placeimg.com/160/120/animals?${Date.now()}`,
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
            <Box mt={3} />
            <Text>{pet.description}</Text>
            <Box mt={3} />
            <Card.Divider />
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
