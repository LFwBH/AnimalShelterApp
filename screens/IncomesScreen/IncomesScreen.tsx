import { StackNavigationProp } from "@react-navigation/stack";
import { DateTime } from "luxon";
import React, { useCallback, useState } from "react";
import { Pressable } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import Box, { Col, Row } from "../../components/Box";
import DateInput from "../../components/DateInput";
import { useTheme } from "../../constants/styled-components";
import { RootStackParamList } from "../../types/navigation";
import AddIncome from "./AddIncome";
import IncomesList from "./IncomesList";

interface IncomesScreenProps
  extends StackNavigationProp<RootStackParamList, "Incomes"> {}

function IncomesScreen({}: IncomesScreenProps) {
  const theme = useTheme();

  const [addIncomeVisible, setAddIncomeVisible] = useState(false);

  const [timestamp, setTimestamp] = useState(() => Date.now());

  const [from, setFrom] = useState(() =>
    DateTime.local().startOf("week").toISODate(),
  );

  const [to, setTo] = useState(() =>
    DateTime.local().endOf("week").toISODate(),
  );

  const handleRequestAddIncome = useCallback(
    () => setAddIncomeVisible(true),
    [],
  );

  const handleCloseAddIncome = useCallback(() => {
    setAddIncomeVisible(false);
    setTimestamp(Date.now());
  }, []);

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
            <IncomesList timestamp={timestamp} filter={{ from, to }} />
          </Col>
        </Row>

        <Box flex={1} position="absolute" right={0} bottom={0}>
          <Pressable onPress={handleRequestAddIncome}>
            <Icon
              color={theme.palette.warning}
              type="antdesign"
              name="plus"
              reverse
              raised
            />
          </Pressable>
        </Box>
      </Box>

      <AddIncome
        filter={{ from, to }}
        isVisible={addIncomeVisible}
        onClose={handleCloseAddIncome}
      />
    </Box>
  );
}

export default IncomesScreen;
