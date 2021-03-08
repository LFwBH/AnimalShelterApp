import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import { Card, Icon } from "react-native-elements";
import { useQuery } from "react-query";

import { fetchPetById } from "../../api/pets";
import Box from "../../components/Box";
import FullScreenError from "../../components/FullScreenError";
import FullScreenLoading from "../../components/FullScreenLoading";
import Text from "../../components/Text";
import { useTheme } from "../../constants/styled-components";
import i18n from "../../i18n";
import { Pet } from "../../models/Pet";
import { RootStackParamList } from "../../types/navigation";

interface PetScreenProps extends StackScreenProps<RootStackParamList, "Pet"> {}

export default function PetScreen({ route }: PetScreenProps) {
  const theme = useTheme();

  const { petId } = route.params;

  const { data, isLoading, isError } = useQuery(["pets", petId], () =>
    fetchPetById({ petId }),
  );

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
              source={{ uri: `${original?.url}?${pet.id}` }}
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
            <Text>
              {i18n("pet.age")}: {pet.age}
            </Text>
            <Text>
              {i18n("pet.breed")}: {pet.breed.name}
            </Text>
            <Text>
              {i18n("pet.color")}: {pet.color.name}
            </Text>
            <Text>
              {i18n("pet.sex")}: {pet.sex.name}
            </Text>
            <Box mt={3} />
            <Card.Divider />
            <Text>{pet.description}</Text>
          </Box>
          <Box width={1} display="flex" alignItems="flex-end" p={2}>
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
