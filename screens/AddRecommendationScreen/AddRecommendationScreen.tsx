import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useCallback, useState } from "react";
import { Platform, SafeAreaView, ScrollView, View } from "react-native";
import { useMutation, useQueryClient } from "react-query";

import Box from "../../components/Box";
import Button from "../../components/Button";
import CheckboxView from "../../components/CheckboxView";
import CustomInputField from "../../components/CustomInputField";
import InputField from "../../components/InputField";
import Text from "../../components/Text";
import theme from "../../constants/theme";
import { Recommendation } from "../../models/Pet";

const DatePicker = (props: any) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <View style={{ paddingLeft: 10 }}>
      <Text style={{ paddingBottom: 7 }}>{props.name}</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    </View>
  );
};

const CustomSelect = () => {
  const [data, setData] = useState("");
  const handleInput = useCallback((value) => {
    setData(value);
  }, []);

  return (
    <Box display="flex" width="100%" justifyContent="center" p={2}>
      <Text>Диагноз:</Text>
      <Box
        style={{
          position: "relative",
          backgroundColor: "#fff",
          height: 30,
          paddingHorizontal: 10,
          marginTop: 10,
          borderColor: "#5381D6",
          borderWidth: 1,
        }}
      >
        <Ionicons
          style={{ position: "absolute", right: 12 }}
          name="chevron-down"
          size={24}
          color="#5381D6"
        />
      </Box>
    </Box>
  );
};

const Card = () => {
  return (
    <>
      <InputField
        label="Наименование:"
        errorLabel="Заполните обязательное поле!"
      />
      <DatePicker name="Дата:" />

      <CustomSelect />
      <CustomInputField label="Рекомендации:" />
      <CheckboxView title="Пожизненно:" />
    </>
  );
};

const AddRecommendationScreen = () => {
  const queryClient = useQueryClient();

  const [recommendation, setRecommendation] = useState<Partial<Recommendation>>(
    {
      name: "",
      date: "",
      pet: "",
      diagnosis: "",
      recommendation: "",
      forever: true,
    },
  );

  const createOverexposureMutation = useMutation({
    onSuccess: () => queryClient.invalidateQueries("recommendation"),
  });

  const handleSaveRecommendation = useCallback(
    () => createOverexposureMutation.mutate(),
    [createOverexposureMutation],
  );

  return (
    <Box
      as={SafeAreaView}
      flex={1}
      style={{
        backgroundColor: theme.palette.primary,
        elevation: 0,
        shadowColor: theme.palette.primary,
      }}
    >
      <ScrollView
        style={{
          backgroundColor: theme.palette.background,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 15,
          paddingTop: 20,
        }}
      >
        <Card />
        <Button
          round
          buttonStyle={{
            paddingVertical: theme.space[2],
            paddingHorizontal: theme.space[2],
            marginBottom: 10,
          }}
          title={
            <>
              <Text fontSize="lg" background>
                Добавить рекомендацию
              </Text>
            </>
          }
        />

        <Button
          round
          buttonStyle={{
            paddingVertical: theme.space[2],
            paddingHorizontal: theme.space[4],
          }}
          title={
            <>
              <Text fontSize="lg" background>
                Далее
              </Text>
            </>
          }
          onPress={handleSaveRecommendation}
        />
        <Box style={{ padding: 20 }} />
      </ScrollView>
    </Box>
  );
};

export default AddRecommendationScreen;
