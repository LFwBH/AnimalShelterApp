import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

import Box from "../../components/Box";
import { RootStackParamList } from "../../types/navigation";

interface AboutUsScreenProps
  extends BottomTabScreenProps<RootStackParamList, "Chat"> {}

export default function CatFormScreen({}: AboutUsScreenProps) {
  const windowWidth = Dimensions.get("window").width * 2.3;

  return (
    <Box as={SafeAreaView} flex={1}>
      <WebView
        source={{
          html: `

<div style="width: ${windowWidth}; display: flex; flex-direction: column; justify-content: center">
  <p
    style="padding: 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    Наш Фонд помощи бездомным животным в г.Йошкар-Ола ОГРН 1121200000481 ИНН
    1215192760 негосударственная организация, поэтому на осуществление всех
    проектов мы сами находим средства - собираем пожертвования, ищем спонсоров.
  </p>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    Помочь материально:
  </p>
  <a
    href="https://vk.com/page-16896741_44143167"
    target="_blank"
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    https://vk.com/page-16896741_44143167
  </a>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    Как сделать пожертвование:
  </p>
  <a
    href="https://vk.com/page-16896741_54375848"
    target="_blank"
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    https://vk.com/page-16896741_54375848
  </a>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    Основная наша задача повысить культуру содержания животных.
  </p>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    Бездомным животным стать домашними, любимыми.
  </p>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    Бесплатная стерилизация:
  </p>
  <a
    href="https://vk.com/pr.save_lives"
    target="_blank"
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    https://vk.com/pr.save_lives
  </a>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    Популярные хэштеги, по которым можно найти много информации:
  </p>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: orange"
  >
    #маленькиедрузьясбольшимсердцем <br />
    #маленькие_подаридом <br />
    #маленькие_впоискахдома <br />
    #dogs_from_small <br />
    #собаки_маленьких <br />
    #маленькиекошки
    <br />
  </p>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    Сайты для размещения объявлений о пристройстве животного:
  </p>
  <p>
    <a
      href="www.avito.ru"
      target="_blank"
      style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
    >
      1. www.avito.ru
    </a>
    <br />
    <a
      href="www.irr.ru"
      target="_blank"
      style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
    >
      2. www.irr.ru
    </a>
    <br />
    <a
      href="www.pg12.ru"
      target="_blank"
      style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
    >
      3. www.pg12.ru
    </a>
  </p>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    Наш сайт:
  </p>
  <a
    href="http://bezdomnye-zhivotnye.ru"
    target="_blank"
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    http://bezdomnye-zhivotnye.ru
  </a>
  <br />
  <div style="display: flex; flex: 1; justify-content: center;">
    <img
      width="105"
      height="56"
      src="http://bezdomnye-zhivotnye.ru/thumb/2/hJMi-lyUN3RIbbofILLR4A/105r88/d/logo_1.png"
    />
  </div>
</div>

`,
        }}
      />
    </Box>
  );
}
