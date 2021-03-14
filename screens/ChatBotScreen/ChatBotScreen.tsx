import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { SafeAreaView } from "react-native";
import ChatBot from "react-native-chatbot";

import Box from "../../components/Box";
import { RootStackParamList } from "../../types/navigation";

interface ChatScreenProps
  extends BottomTabScreenProps<RootStackParamList, "Chat"> {}

export default function PetsScreen({}: ChatScreenProps) {
  const steps = [
    {
      id: "0",
      message: "Здравствуйте!",
      trigger: "1",
    },
    {
      id: "1",
      message:
        'Это чат-бот приюта "Маленькие друзья с большим сердцем". Чем я могу помочь?',
      trigger: "2",
    },
    {
      id: "2",
      options: [
        { value: 1, label: "Как я могу забрать питомца?", trigger: "3" },
        { value: 2, label: "Как мне приехать в приют?", trigger: "4" },
        { value: 3, label: "Куда скинуть на благотворительность?", trigger: "5"},
        { value: 4, label: "Связь с оператором", trigger: "6" },
      ],
    },
    {
      id: "3",
      message:
        "Зайдите в карточку выбранного питомца и заполните анкету. Мы с вами свяжемся.",
      trigger: "2",
    },
    {
      id: "4",
      message:
        "Мы принимаем гостей по выходным. Напишите, когда вам удобно и оставьте свой номер телефона. Мы с вами свяжемся.",
      trigger: "2",
    },
    {
      id: "5",
      message: "В описании приюта есть счёт для пожертвований. Он вам и нужен.",
      trigger: "2",
    },
    {
      id: "6",
      message: "Оператора нет в этой версии",
      trigger: "2",
    },
  ];

  return (
    <Box as={SafeAreaView} flex={1}>
      <ChatBot
        steps={steps}
        footerStyle={{ display: "none" }}
        optionFontColor="#000"
        optionBubbleColor="#fff"
      />
    </Box>
  );
}
