import i18n from "../i18n";

export function boolToString(bool: boolean): string {
  if (bool) {
    return i18n(`common.yes`);
  }
  return i18n(`common.no`);
}
