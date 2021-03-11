import * as Localization from "expo-localization";
import i18njs from "i18n-js";

import ru from "./translations/ru.json";

i18njs.translations = {
  ru: ru,
};

i18njs.defaultLocale = "ru-ru";

i18njs.fallbacks = true;

i18njs.locale = Localization.locale;

export default function i18n(
  scope: i18njs.Scope,
  options?: i18njs.TranslateOptions,
): string {
  return i18njs.t(scope, options);
}
