import React, { useCallback } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { Card } from "react-native-elements";

import Box, { Row } from "../../components/Box";
import Text from "../../components/Text";
import { PET_IMAGE_API } from "../../constants/api";
import { useTheme } from "../../constants/styled-components";
import { LostPet } from "../../models/LostPet";

interface ItemProps {
  pet: LostPet;
  onPress: (pet: LostPet) => void;
}

function Item({ pet, onPress }: ItemProps) {
  const theme = useTheme();

  const handlePress = useCallback(() => onPress(pet), [onPress, pet]);

  const randomPetKind = Math.random() > 0.5 ? "Dog" : "Cat";

  return (
    <Pressable onPress={handlePress}>
      <Card
        containerStyle={{ padding: 0, ...theme.shadow.pt4, borderWidth: 0 }}
      >
        <Box display="flex" flexDirection="row">
          <Box mr={2}>
            <Card.Image
              source={{ uri: PET_IMAGE_API[randomPetKind]?.thumb() }}
              resizeMode="cover"
              style={{ width: 162, height: 132 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </Box>
          <Row flex={1} p={2}>
            <Text flexWrap="wrap" fontSize={14} numberOfLines={5} opacity={0.5}>
              {pet.description}
            </Text>
          </Row>
        </Box>
      </Card>
    </Pressable>
  );
}

export default React.memo(Item);
