import { Ionicons } from "@expo/vector-icons";
import noop from "lodash/noop";
import { lighten } from "polished";
import React, { useCallback } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { Card, Divider, Image } from "react-native-elements";
// @ts-expect-error ts(7016)
import InsetShadow from "react-native-inset-shadow";
import Swipeout from "react-native-swipeout";

import Box, { Row } from "../../components/Box";
import Text from "../../components/Text";
import { PET_IMAGE_API } from "../../constants/api";
import { useTheme } from "../../constants/styled-components";
import i18n from "../../i18n";
import { Pet } from "../../models/Pet";

interface ItemProps {
  pet: Pet;
  onPress?: (pet: Pet) => void;
  onArchive?: (pet: Pet) => void;
}

function Item({ pet, onPress = noop, onArchive = noop }: ItemProps) {
  const theme = useTheme();

  const handlePress = useCallback(() => onPress(pet), [onPress, pet]);

  const handleArchive = useCallback(() => onArchive(pet), [onArchive, pet]);

  return (
    <Card containerStyle={{ padding: 0, ...theme.shadow.pt4, borderWidth: 0 }}>
      <Swipeout
        backgroundColor={theme.palette.background}
        autoClose
        right={[
          {
            backgroundColor: theme.palette.warning,
            underlayColor: lighten(0.1, theme.palette.warning),
            component: (
              <InsetShadow shadowRadius={5} shadowOpacity={0.3}>
                <Row flex={1} alignItems="center" justifyContent="center">
                  <Ionicons name="archive" size={24} color="black" />
                </Row>
              </InsetShadow>
            ),
            onPress: handleArchive,
          },
        ]}
      >
        <Pressable onPress={handlePress}>
          <Box display="flex" flexDirection="row">
            <Box mr={2}>
              <Image
                source={{ uri: PET_IMAGE_API[pet.kind]?.thumb() }}
                resizeMode="cover"
                style={{ width: 162, height: 132 }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </Box>
            <Box flex={1} p={2}>
              <Text fontWeight="semi" primary fontSize={16} mb={1}>
                {pet.name}
              </Text>
              <Row>
                <Box>
                  <Text fontSize="xs">{i18n("pet.age")}:</Text>
                  <Text fontSize="xs">{i18n("pet.color")}:</Text>
                </Box>
                <Box pl={3}>
                  <Text fontSize="xs" opacity={0.5}>
                    {pet.age}
                  </Text>
                  <Text fontSize="xs" opacity={0.5}>
                    {pet.color}
                  </Text>
                </Box>
              </Row>
              <Box my={2}>
                <Divider />
              </Box>
              <Row width={1} flex={1}>
                <Text fontSize={12} flex={1} flexWrap="wrap" numberOfLines={2}>
                  {pet.description}
                </Text>
              </Row>
            </Box>
          </Box>
        </Pressable>
      </Swipeout>
    </Card>
  );
}

export default React.memo(Item);
