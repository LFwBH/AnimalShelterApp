import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";

import Box from "../../components/Box";
import Text from "../../components/Text";
import i18n from "../../i18n";
import { RootStackParamList } from "../../types/navigation";

export default function NotFoundScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "NotFound">) {
  const handlePress = useCallback(() => navigation.replace("Root"), []);

  return (
    <Box flex={1} background alignItems="center" justifyContent="center" p={20}>
      <Text fontSize="lg" fontWeight="semi">
        {i18n("notFound.screenDoesntExist")}
      </Text>
      <Box as={TouchableOpacity} onPress={handlePress} mt={3} py={3}>
        <Text fontSize="sm" text>
          {i18n("notFound.goHome")}
        </Text>
      </Box>
    </Box>
  );
}
