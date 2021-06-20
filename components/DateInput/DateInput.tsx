import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import noop from "lodash/noop";
import { DateTime, Settings } from "luxon";
import React, { useCallback, useMemo, useState } from "react";
import { Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";

import { useTheme } from "../../constants/styled-components";
import Box from "../Box";
import Text from "../Text";

interface DateInputProps {
  /** ISO date string */
  value: string;
  /** ISO date string */
  minimumDate?: string;
  /** ISO date string */
  maximumDate?: string;
  onChange?: (date: string) => void;
}

function DateInput({
  value,
  minimumDate,
  maximumDate,
  onChange = noop,
  ...rest
}: DateInputProps & React.ComponentProps<typeof Box>) {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleOpenModal = useCallback(() => setOpen(true), []);
  const handleCloseModal = useCallback(() => setOpen(false), []);

  const handleChangeDate = useCallback(
    (__: Event, date?: Date) => {
      if (!date) {
        return;
      }

      onChange(DateTime.fromJSDate(date).toISODate());
    },
    [onChange],
  );

  const actualMinimumDate = useMemo(
    () => (minimumDate ? DateTime.fromISO(minimumDate).toJSDate() : undefined),
    [minimumDate],
  );

  const actualMaximumDate = useMemo(
    () => (maximumDate ? DateTime.fromISO(maximumDate).toJSDate() : undefined),
    [maximumDate],
  );

  return (
    <>
      <Box
        borderWidth={1}
        borderColor={theme.palette.primary}
        borderRadius={4}
        px={2}
        py={1}
        justifyContent="center"
        {...rest}
      >
        <TouchableOpacity onPress={handleOpenModal}>
          <Text textAlign="center" fontSize="lg">
            {DateTime.fromISO(value).toLocaleString(DateTime.DATE_SHORT)}
          </Text>
        </TouchableOpacity>
      </Box>

      <Modal
        isVisible={open}
        onBackButtonPress={handleCloseModal}
        onBackdropPress={handleCloseModal}
      >
        <Box p={2} background>
          <DateTimePicker
            textColor={theme.palette.text}
            minimumDate={actualMinimumDate}
            maximumDate={actualMaximumDate}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            locale={Settings.defaultLocale}
            value={DateTime.fromISO(value).toJSDate()}
            onChange={handleChangeDate}
          />
        </Box>
      </Modal>
    </>
  );
}

export default DateInput;
