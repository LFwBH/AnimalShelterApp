import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useCallback } from "react";
import { Linking } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";

import Box from "../../components/Box";
import { useTheme } from "../../constants/styled-components";
import { RootStackParamList } from "../../types/navigation";

interface AboutUsScreenProps
  extends BottomTabScreenProps<RootStackParamList, "Chat"> {}

export default function CatFormScreen({}: AboutUsScreenProps) {
  const theme = useTheme();

  const handleOpenLink = useCallback(function (
    this: WebView,
    event: WebViewNavigation,
  ) {
    if (event.url.startsWith("http")) {
      Linking.openURL(event.url);
      return false;
    }
    return true;
  },
  []);

  return (
    <Box flex={1} primary>
      <Box
        flex={1}
        pt={3}
        background
        borderTopLeftRadius={18}
        borderTopRightRadius={18}
      >
        <WebView
          source={{
            html: `
<div style="width: 100%; display: flex; flex-direction: column; justify-content: center">
  <div style="display: flex; flex: 1; justify-content: center; padding-top: 96px;">
    <img
      width="800"
      height="264"
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
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: ${theme.palette.secondary}; text-decoration: none"
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
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: ${theme.palette.secondary}; text-decoration: none"
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
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: ${theme.palette.secondary}; text-decoration: none"
  >
    https://vk.com/pr.save_lives
  </a>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; margin-bottom: -30px"
  >
    Популярные хэштеги, по которым можно </br> найти много информации:
  </p>
  <p
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: ${theme.palette.warning}"
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
      href="https://avito.ru"
      target="_blank"
      style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: ${theme.palette.secondary}; text-decoration: none"
    >
      1. https://avito.ru
    </a>
    <br />
    <a
      href="https://irr.ru"
      target="_blank"
      style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: ${theme.palette.secondary}; text-decoration: none"
    >
      2. https://irr.ru
    </a>
    <br />
    <a
      href="https://pg12.ru"
      target="_blank"
      style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: ${theme.palette.secondary}; text-decoration: none"
    >
      3. https://pg12.ru
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
    style="padding: 0 40px; font-size: 2em; font-family: Roboto Condensed; font-style: normal; font-weight: normal; color: ${theme.palette.primary}; text-decoration: none"
  >
    <b>http://bezdomnye-zhivotnye.ru</b>
  </a>
  <br />
</div>
`,
          }}
          onShouldStartLoadWithRequest={handleOpenLink}
        />
      </Box>
    </Box>
  );
}
