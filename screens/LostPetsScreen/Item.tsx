import { Ionicons } from "@expo/vector-icons";
import noop from "lodash/noop";
import { lighten } from "polished";
import React, { useCallback } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { Card } from "react-native-elements";
// @ts-expect-error ts(7016)
import InsetShadow from "react-native-inset-shadow";
import Swipeout from "react-native-swipeout";

import Box, { Row } from "../../components/Box";
import Text from "../../components/Text";
import { PET_IMAGE_API } from "../../constants/api";
import { useTheme } from "../../constants/styled-components";
import { LostPet } from "../../models/LostPet";

interface ItemProps {
  pet: LostPet;
  onPress?: (pet: LostPet) => void;
  onDelete?: (pet: LostPet) => void;
}

function Item({ pet, onPress = noop, onDelete = noop }: ItemProps) {
  const theme = useTheme();

  const handlePress = useCallback(() => onPress(pet), [onPress, pet]);

  const handleDelete = useCallback(() => onDelete(pet), [onDelete, pet]);

  const randomPetKind = Math.random() > 0.5 ? "Dog" : "Cat";

  return (
    <Card containerStyle={{ padding: 0, ...theme.shadow.pt4, borderWidth: 0 }}>
      <Swipeout
        backgroundColor={theme.palette.background}
        autoClose
        right={[
          {
            backgroundColor: theme.palette.secondary,
            underlayColor: lighten(0.1, theme.palette.secondary),
            component: (
              <InsetShadow shadowRadius={5} shadowOpacity={0.3}>
                <Row flex={1} alignItems="center" justifyContent="center">
                  <Ionicons
                    name="trash"
                    size={32}
                    color={lighten(0.2, theme.palette.text)}
                  />
                </Row>
              </InsetShadow>
            ),
            onPress: handleDelete,
          },
        ]}
      >
        <Pressable onPress={handlePress}>
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
              <Text
                flexWrap="wrap"
                fontSize={14}
                numberOfLines={5}
                opacity={0.5}
              >
                {pet.description}
              </Text>
            </Row>
          </Box>
        </Pressable>
      </Swipeout>
    </Card>
  );
}

export default React.memo(Item);
