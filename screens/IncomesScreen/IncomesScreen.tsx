import { StackNavigationProp } from "@react-navigation/stack";
import { DateTime } from "luxon";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Box, { Col, Row } from "../../components/Box";
import DateInput from "../../components/DateInput";
import { RootStackParamList } from "../../types/navigation";
import IncomesList from "./IncomesList";

interface IncomesScreenProps
  extends StackNavigationProp<RootStackParamList, "Incomes"> {}

function IncomesScreen({}: IncomesScreenProps) {
  const [from, setFrom] = useState(() =>
    DateTime.local().startOf("week").toISODate(),
  );

  const [to, setTo] = useState(() =>
    DateTime.local().endOf("week").toISODate(),
  );

  return (
    <Box as={SafeAreaView} edges={["right", "left", "bottom"]} flex={1} primary>
      <Box
        flex={1}
        borderTopLeftRadius={18}
        borderTopRightRadius={18}
        background
        p={3}
      >
        <Row>
          <Col flex={12} alignItems="center">
            <DateInput width={1} value={from} onChange={setFrom} />
          </Col>

          <Col justifyContent="center" flex={1} px={3}>
            <Box text height={2} />
          </Col>

          <Col flex={12} alignItems="center">
            <DateInput
              minimumDate={from}
              width={1}
              value={to}
              onChange={setTo}
            />
          </Col>
        </Row>
        <Row flex={1}>
          <Col pt={3} flex={1} justifyContent="center">
            <IncomesList filter={{ from, to }} />
          </Col>
        </Row>
      </Box>
    </Box>
  );
}

export default IncomesScreen;
