import { DateTime } from "luxon";
import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { Divider } from "react-native-elements";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

import Box, { Col, Row } from "../../components/Box";
import Text from "../../components/Text";
import { useTheme } from "../../constants/styled-components";
import { Income, IncomeGroup } from "../../models/Income";
import { BackButton, BackIcon } from "./styles";

interface IncomesModalProps {
  isVisible: boolean;
  income?: IncomeGroup;
  onClose?: () => void;
}

function IncomesModal({ income, isVisible, onClose }: IncomesModalProps) {
  const theme = useTheme();

  const keyExtractor = useCallback((item: Income) => item.id.toString(), []);

  const renderItem = useCallback(({ item }: { item: Income }) => {
    return (
      <Col flex={1}>
        <Row flex={1}>
          <Text fontSize="md">Сумма - {item.amount}</Text>
        </Row>
        <Row flex={1}>
          <Text fontSize="md">
            Имя и Отчество - {item.firstName} {item.lastName}
          </Text>
        </Row>
      </Col>
    );
  }, []);

  const renderSeparator = useCallback(() => {
    return (
      <Divider
        style={{
          backgroundColor: theme.palette.disabled,
          marginVertical: theme.space[3],
        }}
      />
    );
  }, [theme.palette.disabled, theme.space]);

  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <Box edges={["top", "bottom"]} as={SafeAreaView} flex={1} primary>
        <Row py={2} justifyContent="center">
          <BackButton onPress={onClose}>
            <BackIcon />
          </BackButton>
          <Text fontWeight="semi" alignSelf="center" fontSize="lg" background>
            {income &&
              DateTime.fromISO(income?.date).toLocaleString(
                DateTime.DATE_SHORT,
              )}
          </Text>
        </Row>
        <Box
          borderTopLeftRadius={18}
          borderTopRightRadius={18}
          background
          p={3}
          flex={1}
        >
          <Row flex={1} background>
            <FlatList<Income>
              data={income?.incomes ?? []}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ItemSeparatorComponent={renderSeparator}
            />
          </Row>
        </Box>
      </Box>
    </Modal>
  );
}

export default IncomesModal;
