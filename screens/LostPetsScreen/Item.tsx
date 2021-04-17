import React, { useCallback } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { Image } from "react-native-elements";

import Box from "../../components/Box";
import Text from "../../components/Text";
import { PET_IMAGE_API } from "../../constants/api";
import { LostPet } from "../../models/LostPet";

interface ItemProps {
  pet: LostPet;
  onPress: (pet: LostPet) => void;
}

function Item({ pet, onPress }: ItemProps) {
  const handlePress = useCallback(() => onPress(pet), [onPress, pet]);

  const randomPetKind = Math.random() > 0.5 ? "Dog" : "Cat";

  return (
    <Pressable onPress={handlePress}>
      <Box display="flex" primary p={18} m={2} borderRadius={8}>
        <Box display="flex" flexDirection="row" mb={2}>
          <Box mr={2}>
            <Image
              borderRadius={2}
              source={{ uri: PET_IMAGE_API[randomPetKind]?.thumb() }}
              resizeMode="cover"
              style={{ width: 100, height: 100 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </Box>
        </Box>
        <Box>
          <Text background fontSize={14} numberOfLines={2}>
            {pet.description}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}

export default React.memo(Item);
