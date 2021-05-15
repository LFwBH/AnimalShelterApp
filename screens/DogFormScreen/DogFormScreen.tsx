import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import Box from "../../components/Box";
import CheckboxVariant from "../../components/CheckboxVariant/CheckboxVariant";
import CustomInputField from "../../components/CustomInputField/CustomInputField";
import InputField from "../../components/InputField";
import RoundButtonGroup from "../../components/RoundButtonGroup/RoundButtonGroup";
import Text from "../../components/Text";
import { RootStackParamList } from "../../types/navigation";

interface DogFormScreenProps
  extends StackScreenProps<RootStackParamList, "DogForm"> {}

export default function DogFormScreen({ navigation }: DogFormScreenProps) {
  const handleForm = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Box
      as={SafeAreaView}
      edges={["right", "left", "bottom"]}
      flex={1}
      style={{
        backgroundColor: "#6B96E4",
        elevation: 0,
        shadowColor: "#6B96E4",
      }}
    >
      <ScrollView
        style={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 15,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" p={3}>
          <Text>Анкета будущего владельца собак.</Text>
          <Text style={{ textAlign: "center" }}>
            Вопросы которые мы задаем будушим владельцам собак
          </Text>
        </Box>
        <InputField
          label="Ваше ФИО:"
          errorLabel="Заполните обязательное поле!"
        />
        <InputField label="Возраст:" />
        <CustomInputField label="Адрес проживания собаки:" />
        <CheckboxVariant
          label="Жилье свое или арендуете?"
          firstVar="Своё"
          secondVar="Арендую"
        />
        <InputField label="Контактный номер (email при наличии):" />
        <CustomInputField label="Имя собаки/щенка (ссылка на пост)который вам понравился." />
        <CustomInputField label="Как вы видите свою будущую собаку (характер/темперамент):" />
        <CustomInputField label="С кем проживаете и как они отнесутся к питомцу?" />
        <CustomInputField label="Есть ли у вас дети? Сколько и возраст." />
        <CheckboxVariant
          label="Место содержание собаки:"
          firstVar="Квартира"
          secondVar="Дом"
          thirdVar="Вольер"
          forthVar="Будка"
        />
        <CustomInputField label="Есть ли у вас другие животные? Перечислите кто именно." />
        <RoundButtonGroup
          label="Если нет животных, был опыт общения?"
          firstButton="Да"
          secondButton="Нет"
        />
        <CustomInputField label="Что случилось с прежними животными?" />
        <CustomInputField label="Чем планируете кормить собаку/щенка?" />
        <CheckboxVariant
          label="Как планируете гулять с собакой?"
          firstVar="Гулять на поводке"
          secondVar="Отпускать одну"
          thirdVar="Отпускать в огороженном дворе"
        />
        <CustomInputField label="Ваше отношение к кастрации/стерилизации?" />
        <RoundButtonGroup
          label="Если берете не кастрированного, будете кастрировать?"
          firstButton="Да"
          secondButton="Нет"
        />
        <CustomInputField label="Планируете вакцинировать в будущем? Почему?" />
        <CustomInputField label="Будете обращаться в клиники, если животное заболеет?" />
        <CustomInputField label="В какие клиники будете обращаться?" />
        <CustomInputField label="Кто будет присматривать за животным, во время отъезда?" />
        <CustomInputField label="Есть ли у вас дача? Будете брать с собой собаку?" />
        <CustomInputField label="Что будете делать, если появится аллергия на собаку?" />
        <CustomInputField label="Какая причина может стать причиной расставания с животным? Внезапно всплывшая болезнь? Потеря доходов? Переезд? Серьезная болезнь вас или родственников? Не оправдавшее поведение животного?" />
        <CustomInputField label="Согласны ли поддерживать связь с нами (фото, новости)?" />
        <CustomInputField label="Готовы ли вы пригласить нас к себе, показать условия проживания животного?" />
        <CustomInputField label="Готовы ли заключить договор передачи животного, с паспортными данными? В договоре прописано, что вы будете заботиться о животном, беречь. Фонд может передавать животных новому владельцу только по договору.  " />
        <CustomInputField label="Как узнали про нас?" />
        <Button
          title="Отправить"
          type="clear"
          onPress={handleForm}
          buttonStyle={{
            borderWidth: 1,
            borderColor: "#FFBC61",
            width: 240,
            alignSelf: "center",
            marginBottom: 15,
            marginTop: 10,
          }}
          titleStyle={{ color: "#FFBC61" }}
        />
      </ScrollView>
    </Box>
  );
}
