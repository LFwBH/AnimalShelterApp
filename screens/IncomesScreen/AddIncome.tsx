import find from "lodash/find";
import last from "lodash/last";
import noop from "lodash/noop";
import trim from "lodash/trim";
import { DateTime } from "luxon";
import { lighten } from "polished";
import React, { useCallback, useState } from "react";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQueryClient } from "react-query";

import { addIncome, INCOMES_KEY } from "../../api/incomes";
import Box, { Col, Row } from "../../components/Box";
import Button from "../../components/Button";
import DateInput from "../../components/DateInput";
import InputField from "../../components/InputField";
import Text from "../../components/Text";
import { useTheme } from "../../constants/styled-components";
import i18n from "../../i18n";
import { Income, IncomeGroup } from "../../models/Income";

interface AddIncomeProps {
  isVisible: boolean;
  filter: {
    from: string;
    to: string;
  };
  onClose?: () => void;
}

function AddIncome({ isVisible, filter, onClose = noop }: AddIncomeProps) {
  const theme = useTheme();

  const queryClient = useQueryClient();

  const [date, setDate] = useState(() => DateTime.local().toISODate());
  const [sum, setSum] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const updateTodoMutation = useMutation(
    (income: Partial<Income>) => addIncome(income),
    {
      onSuccess: async (income) => {
        income.id = Date.now();
        queryClient.setQueryData([INCOMES_KEY, filter], (old) => {
          const data = (old ?? []) as unknown as IncomeGroup[];
          const group = find(data, ["date", income.date]);
          group?.incomes.push(income as unknown as Income);
          return [...data];
        });
      },
    },
  );

  const handleClose = useCallback(() => {
    setDate(DateTime.local().toISODate());
    setSum(null);
    setName(null);

    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(async () => {
    const [firstName, lastName] = name?.split(" ") ?? [];
    const amount = Number(sum);

    await updateTodoMutation.mutateAsync({
      date,
      amount: amount,
      firstName: trim(firstName),
      lastName: trim(lastName),
    });

    handleClose();
  }, [date, handleClose, name, sum, updateTodoMutation]);

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={handleClose}
      onBackdropPress={handleClose}
    >
      <Box
        edges={["top", "bottom"]}
        as={SafeAreaView}
        background
        borderRadius={18}
        py={4}
      >
        <Row>
          <Text width={1} textAlign="center" fontWeight="700" fontSize={24}>
            {i18n("incomes.create.title")}
          </Text>
        </Row>
        <Row bg={lighten(0.2, theme.palette.disabled)} height={2} my={3} />
        <Col px={4}>
          <Row alignItems="center" mb={3}>
            <Col flex={2}>
              <Text fontSize="sm">{i18n("incomes.create.fields.date")}:</Text>
            </Col>
            <Col flex={5}>
              <Row mx="10px">
                <DateInput
                  style={{ width: "100%", height: 40 }}
                  value={date}
                  onChange={setDate}
                />
              </Row>
            </Col>
          </Row>
          <Row alignItems="center" mb={3}>
            <Col flex={2}>
              <Text fontSize="sm">{i18n("incomes.create.fields.sum")}:</Text>
            </Col>
            <Col flex={5}>
              <InputField
                keyboardType="numeric"
                value={sum ?? ""}
                noPadding
                onChangeText={setSum}
              />
            </Col>
          </Row>
          <Row alignItems="center">
            <Col flex={2}>
              <Text fontSize="sm">{i18n("incomes.create.fields.name")}:</Text>
            </Col>
            <Col flex={5}>
              <InputField value={name ?? ""} noPadding onChangeText={setName} />
            </Col>
          </Row>
        </Col>
        <Row py={3} />
        <Row px={4} justifyContent="center">
          <Button
            raised
            disabled={
              !date ||
              !sum ||
              !name ||
              name?.split(" ").length !== 2 ||
              last(name?.split(" "))?.length === 0
            }
            variant="success"
            width="100%"
            title={
              <Text py={2} fontSize="lg" background>
                {i18n("incomes.create.actions.submit")}
              </Text>
            }
            onPress={handleSubmit}
          />
        </Row>
      </Box>
    </Modal>
  );
}

export default AddIncome;
