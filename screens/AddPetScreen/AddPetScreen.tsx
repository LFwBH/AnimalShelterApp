import DateTimePicker from "@react-native-community/datetimepicker";
// import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Platform, ScrollView, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";

import Box from "../../components/Box";
import CheckboxView from "../../components/CheckboxView";
import CustomInputField from "../../components/CustomInputField";
import InputField from "../../components/InputField";
import RoundButtonGroup from "../../components/RoundButtonGroup";
import Text from "../../components/Text";
import theme from "../../constants/theme";

const colorPet = [
  { label: "Черный", value: "черный" },
  { label: "Белый", value: "белый" },
  { label: "Рыжий", value: "рыжий" },
  { label: "Разноцветный", value: "разноцветный" },
];

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

// const ImageView = (props: any) => {
//   const [image, setImage] = useState<string | null>(null);
//
//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== "web") {
//         const {
//           status,
//         } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== "granted") {
//           alert("Sorry, we need camera roll permissions to make this work!");
//         }
//       }
//     })();
//   }, []);
//
//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//
//     console.log(result);
//
//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };
//
//   return (
//     <View>
//       <Text>{props.name}</Text>
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Button title="Pick an image from camera roll" onPress={pickImage} />
//         {image && (
//           <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
//         )}
//       </View>
//     </View>
//   );
// };

const AddPetScreen = () => {
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
        }}
      >
        <InputField
          label="Кличка питомца:"
          errorLabel="Заполните обязательное поле!"
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
        <PickerView name="Окрас" values={colorPet} />
        <CheckboxView label="Стерилизация:" />
        <DatePicker name="Дата стерилизации" />
        <CheckboxView label="Паспорт:" />
        <CustomInputField label="Характеристика:" />
        <CustomInputField label="Особенность:" />
        {/*/!*<ImageView name="Фото" />*!/*/}
        <InputField
          label="Откуда прибыл питомец:"
          errorLabel="Заполните обязательное поле!"
        />
      </ScrollView>
    </Box>
  );
};

export default AddPetScreen;
