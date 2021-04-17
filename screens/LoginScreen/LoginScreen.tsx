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
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
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

  const handleSubmitForm = useCallback(async () => {
    await register(form);
  }, [form]);

  const handleToggleRegistration = useCallback(() => {
    setIsLogin(!login);
  }, []);

  const handleChangeEmail = useCallback(
    (text: string) => setForm({ ...form, email: text }),
    [setForm, form],
  );

  const handleChangePassword = useCallback(
    (text: string) => setForm({ ...form, password: text }),
    [setForm, form],
  );

  content = isLogin ? (
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
        onPress={handleToggleRegistration}
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
        onChangeText={handleChangeEmail}
      />
      <InputField
        placeholderText=" "
        label="Пароль"
        errorMessage="Заполните обязательное поле!"
        onChangeText={handleChangePassword}
      />
      <Button title="Назад" type="clear" onPress={handleToggleRegistration} />
      <Button
        title="Зарегистрироваться"
        type="clear"
        onPress={handleSubmitForm}
      />
    </Box>
  );

  return (
    <Box as={SafeAreaView} flex={1}>
      {content}
    </Box>
  );
}
