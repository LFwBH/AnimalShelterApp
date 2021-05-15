import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback } from "react";

import Box from "../../components/Box";
import i18n from "../../i18n";
import { RootStackParamList } from "../../types/navigation";
import ReportBar from "./ReportBar";

interface ReportsScreenProps
  extends StackScreenProps<RootStackParamList, "Reports"> {}

function ReportsScreen({ navigation }: ReportsScreenProps) {
  const handleGoToIncomes = useCallback(() => {
    navigation.navigate("Incomes");
  }, [navigation]);

  const handleGoToOutcomes = useCallback(() => {
    navigation.navigate("Outcomes");
  }, [navigation]);

  return (
    <Box flex={1} primary>
      <Box
        flex={1}
        background
        borderTopLeftRadius={18}
        borderTopRightRadius={18}
        p={3}
      >
        <ReportBar title={i18n("reports.kinds.arrivals")} />
        <Box p={2} />
        <ReportBar title={i18n("reports.kinds.departures")} />
        <Box p={2} />
        <ReportBar
          title={i18n("reports.kinds.income")}
          onPress={handleGoToIncomes}
        />
        <Box p={2} />
        <ReportBar
          title={i18n("reports.kinds.outcome")}
          onPress={handleGoToOutcomes}
        />
      </Box>
    </Box>
  );
}

export default ReportsScreen;
