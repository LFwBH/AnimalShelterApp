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
  <div style="display: flex; flex: 1; justify-content: center; padding-bottom: 200px">
    <img
      width="800"
      height="250"
      src="https://i.imgur.com/hsw1OQz.png"
    />
  </div>
  <p
    style="padding: 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; margin-bottom: -5px"
  >
    Наш Фонд помощи бездомным животным в <br />
    г.Йошкар-Ола <br />
    ОГРН 1121200000481 ИНН
    1215192760 негосударственная организация, поэтому на осуществление всех
    проектов мы сами <br />
    находим средства - собираем пожертвования, <br />
    ищем спонсоров.
  </p>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; margin-bottom: -5px"
  >
    Помочь материально:
  </p>
  <a
    href="https://vk.com/page-16896741_44143167"
    target="_blank"
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: #FE817B; text-decoration: none"
  >
    https://vk.com/page-16896741_44143167
  </a>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; margin-bottom: -5px"
  >
    Как сделать пожертвование:
  </p>
  <a
    href="https://vk.com/page-16896741_54375848"
    target="_blank"
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: #FE817B; text-decoration: none"
  >
    https://vk.com/page-16896741_54375848
  </a>
  <div style=" margin-top: 30px">
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    <b>Основная наша задача </b> повысить  </br>
    культуру содержания животных.
  </p>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal;"
  >
    Бездомным животным стать </br>
    домашними, любимыми.
  </p>
  </div>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; margin-bottom: -5px"
  >
    Бесплатная стерилизация:
  </p>
  <a
    href="https://vk.com/pr.save_lives"
    target="_blank"
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: #FE817B; text-decoration: none"
  >
    https://vk.com/pr.save_lives
  </a>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; margin-bottom: -30px"
  >
    Популярные хэштеги, по которым можно </br> найти много информации:
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
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; margin-bottom: -5px"
  >
    Сайты для размещения объявлений о </br>
    пристройстве животного:
  </p>
  <p>
    <a
      href="www.avito.ru"
      target="_blank"
      style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: #FE817B; text-decoration: none"
    >
      1. www.avito.ru
    </a>
    <br />
    <a
      href="www.irr.ru"
      target="_blank"
      style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: #FE817B; text-decoration: none"
    >
      2. www.irr.ru
    </a>
    <br />
    <a
      href="www.pg12.ru"
      target="_blank"
      style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: #FE817B; text-decoration: none"
    >
      3. www.pg12.ru
    </a>
  </p>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; margin-bottom: -5px"
  >
    Наш сайт:
  </p>
  <a
    href="http://bezdomnye-zhivotnye.ru"
    target="_blank"
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: #6B96E4; text-decoration: none"
  >
    <b>http://bezdomnye-zhivotnye.ru</b>
  </a>
  <br />
</div>

`,
        }}
      />
    </Box>
  );
}
