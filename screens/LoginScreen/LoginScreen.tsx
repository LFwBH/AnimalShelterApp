import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native";
import { Button } from "react-native-elements";

import Box from "../../components/Box";
import InputField from "../../components/InputField/InputField";
import Text from "../../components/Text";
import { RootStackParamList } from "../../types/navigation";

interface LoginScreenProps
  extends StackScreenProps<RootStackParamList, "LoginScreen"> {}

export default function PetScreen({ route, navigation }: LoginScreenProps) {
  const [login, setLogin] = useState(true);
  let content: JSX.Element | null = null;

  const handleLogin = useCallback(() => {
    navigation.navigate("Root");
  }, [navigation]);

  const handleRegistration = useCallback(() => {
    setLogin(!login);
  }, [navigation, login]);

  content = login ? (
    <Box>
      <InputField
        placeholderText=" "
        label="Email"
        errorMessage="Заполните обязательное поле!"
      />
      <InputField
        placeholderText=" "
        label="Пароль"
        errorMessage="Заполните обязательное поле!"
      />
      <Button title="Войти" type="clear" onPress={handleLogin} />
      <Button title="Регистрация" type="clear" onPress={handleRegistration} />
    </Box>
  ) : (
    <Box>
      <InputField
        placeholderText=" "
        label="Имя"
        errorMessage="Заполните обязательное поле!"
      />
      <InputField
        placeholderText=" "
        label="Email"
        errorMessage="Заполните обязательное поле!"
      />
      <InputField
        placeholderText=" "
        label="Пароль"
        errorMessage="Заполните обязательное поле!"
      />
      <Button title="Назад" type="clear" onPress={handleRegistration} />
      <Button
        title="Зарегестрироваться"
        type="clear"
        onPress={handleRegistration}
      />
    </Box>
  );

  return (
    <Box as={SafeAreaView} flex={1}>
      {content}
    </Box>
  );
}
