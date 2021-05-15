import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";

import { fetchLostPetById } from "../../api/lost";
import Box from "../../components/Box";
import FullScreenError from "../../components/FullScreenError";
import FullScreenLoading from "../../components/FullScreenLoading";
import Text from "../../components/Text";
import { PET_IMAGE_API } from "../../constants/api";
import { useTheme } from "../../constants/styled-components";
import { LostPet } from "../../models/LostPet";
import { RootStackParamList } from "../../types/navigation";

interface PetScreenProps
  extends StackScreenProps<RootStackParamList, "LostPet"> {}

export default function LostPetScreen({ route }: PetScreenProps) {
  const theme = useTheme();

  const { petId } = route.params;

  const { data, isLoading, isError } = useQuery(["pets", petId], () =>
    fetchLostPetById({ petId }),
  );

  let content: JSX.Element | null = null;

  const randomPetKind = Math.random() > 0.5 ? "Dog" : "Cat";

  if (isLoading) {
    content = <FullScreenLoading />;
  } else if (!isError) {
    const pet = data?.data as NonNullable<LostPet>;

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
                source={{ uri: PET_IMAGE_API[randomPetKind]?.full() }}
                style={{
                  width: 360,
                  height: 300,
                }}
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator />}
              />
            </Box>
            <Card.Divider
              style={{
                marginTop: theme.space[4],
                marginBottom: theme.space[4],
                elevation: 1,
                opacity: 0.5,
              }}
            />
            <Text px={3}>{pet.description}</Text>
          </ScrollView>
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
