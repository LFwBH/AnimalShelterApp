import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useCallback, useState } from "react";
import { Platform, SafeAreaView, ScrollView, View } from "react-native";
import { useMutation, useQueryClient } from "react-query";

import { createPet } from "../../api/pets";
import Box from "../../components/Box";
import Button from "../../components/Button";
import CheckboxView from "../../components/CheckboxView";
import CustomInputField from "../../components/CustomInputField";
import InputField from "../../components/InputField";
import RoundButtonGroup from "../../components/RoundButtonGroup";
import Text from "../../components/Text";
import theme from "../../constants/theme";
import { Pet } from "../../models/Pet";

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

const AddPetScreen = () => {
  const queryClient = useQueryClient();

  const [pet, setPet] = useState<Partial<Pet>>({
    color: "",
    kind: "Cat",
    sex: "Boy",
    name: "",
    description: "",
    age: 0,
  });

  const [checked, setChecked] = useState(false);

  const handleChangeFlag = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  const createPetMutation = useMutation(() => createPet(pet), {
    onSuccess: () => queryClient.invalidateQueries("pets"),
  });

  const handleSavePet = useCallback(() => createPetMutation.mutate(), [
    createPetMutation,
  ]);

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
          paddingTop: 10,
        }}
      >
        <InputField
          label="Кличка питомца:"
          errorLabel="Заполните обязательное поле!"
          on
        />
        <DatePicker name="Дата рождения" />
        <RoundButtonGroup
          label="Вид питомца"
          firstButton="Кошка"
          secondButton="Собака"
        />
        <RoundButtonGroup
          label="Пол питомца:"
          firstButton="мужской"
          secondButton="женский"
        />
        <InputField label="Окрас:" errorLabel="Заполните обязательное поле!" />
        <CheckboxView
          checked={checked}
          title="Стерилизация:"
          onPress={handleChangeFlag}
        />
        <DatePicker name="Дата стерилизации" />
        <CheckboxView title="Паспорт:" />
        <CustomInputField label="Характеристика:" />
        <CustomInputField label="Особенность:" />
        {/*/!*<ImageView name="Фото" />*!/*/}
        <InputField
          label="Откуда прибыл питомец:"
          errorLabel="Заполните обязательное поле!"
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
          onPress={handleSavePet}
        />
      </ScrollView>
    </Box>
  );
};

export default AddPetScreen;
