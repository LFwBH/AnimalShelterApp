import * as Localization from "expo-localization";
import i18njs from "i18n-js";

import ru from "./translations/ru.json";

i18njs.translations = {
  ru: ru,
};

i18njs.defaultLocale = 'ru-ru'

i18njs.fallbacks = true;

i18njs.locale = Localization.locale;

type GetDictValue<T extends string, O> = T extends `${infer A}.${infer B}`
  ? A extends keyof O
    ? GetDictValue<B, O[A]>
    : never
  : T extends keyof O
  ? O[T]
  : never;

type CheckDictString<T extends string, O> = T extends `${infer A}.${infer B}`
  ? A extends keyof O
    ? `${A}.${Extract<CheckDictString<B, O[A]>, string>}`
    : never
  : T extends keyof O
  ? T
  : never;

export default function i18n<T extends string>(
  scope: T & CheckDictString<T, typeof ru>,
  options?: i18njs.TranslateOptions,
): GetDictValue<T, typeof ru> {
  return (i18njs.t(scope, options) as unknown) as GetDictValue<T, typeof ru>;
}
