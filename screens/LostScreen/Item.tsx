import React, { useCallback } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { Image } from "react-native-elements";

import Box from "../../components/Box";
import Text from "../../components/Text";
import { LostPet } from "../../models/LostPet";

interface ItemProps {
  pet: LostPet;
  onPress: (pet: LostPet) => void;
}

function Item({ pet, onPress }: ItemProps) {
  const handlePress = useCallback(() => onPress(pet), [onPress, pet]);

  return (
    <Pressable onPress={handlePress}>
      <Box display="flex" primary p={18} m={2} borderRadius={2}>
        <Box display="flex" flexDirection="row" mb={2}>
          <Box mr={2}>
            <Image
              borderRadius={2}
              source={{
                uri: `https://placeimg.com/160/120/animals?${Date.now()}`,
              }}
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
