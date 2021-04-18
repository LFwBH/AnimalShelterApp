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
      <Box
        display="flex"
        primary
        m={2}
        borderRadius={8}
        style={{
          borderColor: "#BFBFBF",
          borderWidth: 1,
          backgroundColor: "#fff",
          marginTop: 10,
        }}
      >
        <Box display="flex" flexDirection="row">
          <Box mr={2}>
            <Image
              borderRadius={2}
              source={{ uri: PET_IMAGE_API[randomPetKind]?.thumb() }}
              resizeMode="cover"
              style={{ width: 162, height: 132 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </Box>
          <Box>
            <Text
              fontSize={12}
              background
              style={{ color: "#000", opacity: 0.5, width: 200 }}
            >
              {pet.description}
            </Text>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
}

export default React.memo(Item);
