import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native";
import { Button } from "react-native-elements";

import { login, register } from "../../api/auth";
import Box from "../../components/Box";
import InputField from "../../components/InputField/InputField";
import { RootStackParamList } from "../../types/navigation";

interface LoginScreenProps
  extends StackScreenProps<RootStackParamList, "LoginScreen"> {}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [loginData, setLogin] = useState(true);
  const [registrationArr, setRegistration] = useState({
    email: "",
    password: "",
  });

  let content: JSX.Element | null = null;

  const handleLogin = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Root" }],
    });
  }, [navigation]);

  const handleRegistration = useCallback(() => {
    console.log(registrationArr);
    register(registrationArr).then((res) => {
      console.log(res);
    });
  }, [login]);

  const handleRegistrationPage = useCallback(() => {
    setLogin(!login);
  }, [login]);

  const handleRegisterEmail = useCallback(
    (text: string) => {
      setRegistration({ ...registrationArr, email: text });
      console.log(registrationArr);
    },
    [setRegistration, registrationArr],
  );

  const handleRegisterPassword = useCallback(
    (text: string) => {
      setRegistration({ ...registrationArr, password: text });
      console.log(registrationArr);
    },
    [setRegistration, registrationArr],
  );

  content = loginData ? (
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
      <Button
        title="Регистрация"
        type="clear"
        onPress={handleRegistrationPage}
      />
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
        onChangeText={handleRegisterEmail}
      />
      <InputField
        placeholderText=" "
        label="Пароль"
        errorMessage="Заполните обязательное поле!"
        onChangeText={handleRegisterPassword}
      />
      <Button title="Назад" type="clear" onPress={handleRegistrationPage} />
      <Button
        title="Зарегистрироваться"
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
