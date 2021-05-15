import noop from "lodash/noop";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import Box from "../../components/Box";
import Text from "../../components/Text";
import { useTheme } from "../../constants/styled-components";

interface ReportBarProps {
  title: string;
  onPress?: () => void;
}

function ReportBar({ title, onPress = noop }: ReportBarProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        borderRadius={2}
        borderWidth={1}
        borderColor={theme.palette.primary}
        p={3}
      >
        <Text fontSize="lg">{title}</Text>
      </Box>
    </TouchableOpacity>
  );
}

export default ReportBar;
