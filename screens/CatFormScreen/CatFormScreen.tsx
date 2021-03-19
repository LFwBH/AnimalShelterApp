import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Button } from "react-native-elements";

import Box from "../../components/Box";
import CheckboxVariant from "../../components/CheckboxVariant/CheckboxVariant";
import CustomInputField from "../../components/CustomInputField/CustomInputField";
import InputField from "../../components/InputField";
import RoundButtonGroup from "../../components/RoundButtonGroup/RoundButtonGroup";
import Text from "../../components/Text";
import { RootStackParamList } from "../../types/navigation";

interface CatFormScreenProps
  extends StackScreenProps<RootStackParamList, "CatFormScreen"> {}

export default function CatFormScreen({ navigation }: CatFormScreenProps) {
  const handleForm = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Box as={SafeAreaView} flex={1}>
      <ScrollView>
        <Box display="flex" alignItems="center" justifyContent="center" p={2}>
          <Text>
            Здравствуйте! Если хотите взять у нас кошку, заполните пожалуйста
            эту анкету и мы свяжемся с вами!
          </Text>
          <Text>Эти вопросы мы задаем по телефону.</Text>
        </Box>
        <InputField
          label="Ваше ФИО:"
          errorMessage="Заполните обязательное поле!"
        />
        <InputField label="Возраст:" />
        <RoundButtonGroup
          firstButton="Кошку"
          secondButton="Кота"
          thirdButton="Котенка"
        />
        <CheckboxVariant
          label="Проживать кошка будет в квартире или в своем доме?"
          firstVar="Квартира"
          secondVar="Дом"
        />
        <CustomInputField label="Адрес проживания кошки:" />
        <InputField label="Ваше семейное положение:" />
        <CustomInputField label="Есть ли у вас дети? Возраст?" />
        <CustomInputField label="Все ли члены семьи хотят завести животное?" />
        <InputField label="Контактный телефон для связи:" />
        <CustomInputField label="Есть ли у вас сейчас домашние животные? Расскажите о них." />
        <CustomInputField label="Были ли у вас животные раньше? Где они сейчас? Если умерли, то от чего?" />
        <CustomInputField label="Чем кормили своих животных или чем собираетесь кормить новых?" />
        <RoundButtonGroup
          label="Как вы относитесь к кастрации/стерилизации?"
          firstButton="Положительно"
          secondButton="Отрицательно"
        />
        <RoundButtonGroup
          label="Были ли кастрированы/стерилизованы ваши животные?"
          firstButton="Да"
          secondButton="Нет"
        />
        <CustomInputField label="Как относитесь к самовыгулу?" />
        <CustomInputField label="Есть ли у вас дача и собираетесь ли вы уезжать туда летом с котом? " />
        <CustomInputField label="С кем вы будет оставлять животных, на время отпусков?" />
        <CustomInputField label="Как отнесетесь к тому, если кошка нанесет урон обстановке?" />
        <CustomInputField label="Какое животное вы хотите видеть рядом с собой? Ласковое и приставучее или самодостаточное и легко переносящее одиночество? Спящее рядом или спящее в лежаке? Игривое и активное или сонное и ленивое?" />
        <CustomInputField label="Как вы думаете — сколько времени нужно животному, чтобы привыкнуть к новому дому и к незнакомым людям? Как вы собираетесь помочь ему обосноваться в вашей квартире?" />
        <CustomInputField label="Готовы ли вы к появлению питомца в доме? У вас есть лоток, наполнитель для лотка, корм, переноска и когтеточка для кошки?" />
        <CustomInputField label="Какая причина может заставить вас отказаться от совместной жизни с животным? Внезапно всплывшая болезнь, заразная и для людей (лишай, хламидиоз, глисты)? Потеря работы и доходов? Серьёзная болезнь ваша или родственника? Переезд? Аллергия на шерсть ваша или родственника? Не оправдавшее ожиданий поведение животного с вами?" />
        <RoundButtonGroup
          label="Готовы ли вы пригласить нас к себе в гости, чтобы показать условия содержания будущего животного? "
          firstButton="Да"
          secondButton="Нет"
          thirdButton="Свой вариант"
          errorMessage="Заполните обязательное поле!"
        />
        <CustomInputField label="Готовы заполнить договор передачи животного? Все животные отдаются по предъявлению паспорта, с заключением договора. В котором прописано, что вы обязуетесь заботиться о животном. Если нет, напишите почему." />
        <CustomInputField label="Что вы знаете о самых популярных кошачьих болезнях, которые распространены среди всех уличных животных поголовно и как будете их лечить, если случится рецидив (уличная жизнь навсегда оставляет след на здоровье кошки, нужно быть к этому готовым)?" />
        <CustomInputField label="Есть ли у вас сетки на окнах? Собираетесь ли устанавливать? Готовы ли смириться с тем, что с окнами на распашку и проветриванием придётся попрощаться? Кошки очень часто падают из окон." />
        <CustomInputField label="Что вы знаете о вакцинации (прививках) кошек? Планируете ли вакцинировать в будущем?" />
        <CustomInputField label="Назовите имя или прикрепите ссылку на фото выбранной кошки:" />
        <RoundButtonGroup
          label="Согласны ли вы поддерживать с нами связь и делиться судьбой спасенных нами животных с теми, кто подарил им когда-то второй шанс на счастливую жизнь? Мы не контролируем владельцев, мы дружим и общаемся."
          firstButton="Да"
          secondButton="Нет"
          thirdButton="Свой вариант"
          errorMessage="Заполните обязательное поле!"
        />
        <Button title="Отправить" type="clear" onPress={handleForm} />
      </ScrollView>
    </Box>
  );
}
