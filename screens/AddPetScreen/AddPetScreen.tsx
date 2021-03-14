import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Button, Image, Platform, Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";

import Box from "../../components/Box";

const kindPet = [
  { label: "Кошачьи", value: "кошачьи" },
  { label: "Собачьи", value: "собачьи" },
];

const sexPet = [
  { label: "М", value: "м" },
  { label: "Ж", value: "ж" },
];

const colorPet = [
  { label: "Черный", value: "черный" },
  { label: "Белый", value: "белый" },
  { label: "Рыжий", value: "рыжий" },
  { label: "Разноцветный", value: "разноцветный" },
];

const InputView = (props: any) => {
  return (
    <View>
      <Text>{props.name}</Text>
      <TextInput defaultValue={props.value} />
    </View>
  );
};

const PickerView = (props: any) => {
  return (
    <View>
      <Text>{props.name}</Text>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={props.values}
      />
    </View>
  );
};

const CheckboxView = (props: any) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View>
      <Text>{props.name}</Text>
      <CheckboxView value={isSelected} onValueChange={setSelection} />
    </View>
  );
};

const DatePicker = (props: any) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <View>
      <Text>{props.name}</Text>
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

const ImageView = (props: any) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
      <Text>{props.name}</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    </View>
  );
};

const AddPetScreen = () => {
  return (
    <Box as={SafeAreaView} flex={1}>
      <InputView name="Кличка" value="Введите кличку питомца" />
      <DatePicker name="Дата рождения" />
      <PickerView name="Вид животного" values={kindPet} />
      <PickerView name="Пол" values={sexPet} />
      <PickerView name="Окрас" values={colorPet} />
      <CheckboxView name="Стерилизация" />
      <DatePicker name="Дата стерилизации" />
      <CheckboxView name="Паспорт" />
      <InputView name="Характеристика" value="Введите характеристику питомца" />
      <InputView name="Особенность" value="Введите особенность питомца" />
      <ImageView name="Фото" />
      <InputView name="Откуда" value="Введите откуда прибыл питомец" />
    </Box>
  );
};

export default AddPetScreen;
