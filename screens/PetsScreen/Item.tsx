import lowerFirst from "lodash/lowerFirst";
import React, { useCallback } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { Image } from "react-native-elements";

import Box from "../../components/Box";
import Text from "../../components/Text";
import { PET_IMAGE_API } from "../../constants/api";
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
              source={{ uri: PET_IMAGE_API[pet.kind]?.thumb() }}
              resizeMode="cover"
              style={{ width: 162, height: 132 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </Box>
          <Box p={2}>
            <Text
              fontWeight="bold"
              background
              fontSize={16}
              mb={1}
              style={{ fontWeight: "bold", color: "#6B96E4" }}
            >
              {pet.name}
            </Text>
            <Box style={{ display: "flex", flexDirection: "row" }}>
              <Box>
                <Text fontSize={12} background style={{ color: "#000" }}>
                  {i18n("pet.age")}:
                </Text>
                <Text background fontSize={12} style={{ color: "#000" }}>
                  {i18n("pet.sterilization")}:
                </Text>
                <Text background fontSize={12} style={{ color: "#000" }}>
                  {i18n("pet.vacination")}:
                </Text>
              </Box>
              <Box style={{ paddingLeft: 15 }}>
                <Text
                  fontSize={12}
                  background
                  style={{ color: "#000", opacity: 0.5 }}
                >
                  {pet.age}
                </Text>
                <Text
                  background
                  fontSize={12}
                  style={{ color: "#000", opacity: 0.5 }}
                >
                  {i18n(`pet.sexType.${lowerFirst(pet.sex)}`)}
                </Text>
                <Text
                  background
                  fontSize={12}
                  style={{ color: "#000", opacity: 0.5 }}
                >
                  {pet.color}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
}

export default React.memo(Item);
