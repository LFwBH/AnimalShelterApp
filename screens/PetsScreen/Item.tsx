import lowerFirst from "lodash/lowerFirst";
import React, { useCallback } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { Image } from "react-native-elements";

import Box from "../../components/Box";
import Text from "../../components/Text";
import i18n from "../../i18n";
import { Pet } from "../../models/Pet";

interface ItemProps {
  pet: Pet;
  onPress: (pet: Pet) => void;
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
          <Box>
            <Text fontWeight="bold" background fontSize={16} mb={1}>
              {pet.name}
            </Text>
            <Text fontSize={12} background>
              {i18n("pet.age")}: {pet.age}
            </Text>
            <Text background fontSize={12}>
              {i18n("pet.sex")} {i18n(`pet.sexType.${lowerFirst(pet.sex)}`)}
            </Text>
            <Text background fontSize={12}>
              {i18n("pet.color")}: {pet.color}
            </Text>
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
