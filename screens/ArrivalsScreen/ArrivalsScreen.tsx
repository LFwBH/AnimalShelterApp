import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Box from "../../components/Box";
import Text from "../../components/Text";
import { RootStackParamList } from "../../types/navigation";

interface ArrivalsScreenProps
  extends StackNavigationProp<RootStackParamList, "Arrivals"> {}

function ArrivalsScreen({}: ArrivalsScreenProps) {
  return (
    <Box as={SafeAreaView} edges={["right", "left", "bottom"]} flex={1} primary>
      <Box
        flex={1}
        borderTopLeftRadius={18}
        borderTopRightRadius={18}
        background
        p={3}
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={72}>🚧</Text>
      </Box>
    </Box>
  );
}

export default ArrivalsScreen;
