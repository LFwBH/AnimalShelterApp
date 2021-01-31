import React from "react";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";

import Box from "../../components/Box";
import Text from "../../components/Text";
import { Pet } from "../../models/Pet";

interface ItemProps {
  pet: Pet;
}

function Item({ pet }: ItemProps) {
  return (
    <Box display="flex" primary p={18} m={2} borderRadius={2}>
      <Box display="flex" flexDirection="row" mb={2}>
        <Box mr={2}>
          <Image
            borderRadius={2}
            source={{ uri: `${pet.image.thumb}?${pet.id}` }}
            style={{ width: 100, height: 100 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </Box>
        <Box>
          <Text fontWeight="bold" background fontSize={16}>
            {pet.name} {pet.age}
          </Text>
          <Text background fontSize={12}>
            {pet.sex.name} {pet.color.name}
          </Text>
          <Text background fontSize={12}>
            {pet.breed.name}
          </Text>
        </Box>
      </Box>
      <Box>
        <Text background fontSize={14} numberOfLines={2}>
          {pet.description}
        </Text>
      </Box>
    </Box>
  );
}

export default React.memo(Item);
