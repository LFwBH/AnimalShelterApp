import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useContext, useState } from "react";
import { SafeAreaView } from "react-native";
import { Button } from "react-native-elements";

import { login, register } from "../../api/auth";
import Box, { Col, Row } from "../../components/Box";
import InputField from "../../components/InputField/InputField";
import Text from "../../components/Text";
import { AppContext } from "../../context/context";
import { RootStackParamList } from "../../types/navigation";

interface LoginScreenProps
  extends StackScreenProps<RootStackParamList, "Login"> {}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { changeUser } = useContext(AppContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const goToRoot = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Root" }],
    });
  }, [navigation]);

  const handleSubmitRegistration = useCallback(async () => {
    try {
      const { data } = await register(form);

      await changeUser({
        email: form.email,
        token: data.token,
      });

      goToRoot();
    } catch {}
  }, [changeUser, form, goToRoot]);

  const handleSubmitLogin = useCallback(async () => {
    try {
      const { data } = await login(form);

      await changeUser({
        email: form.email,
        token: data.token,
      });

      goToRoot();
    } catch {}
  }, [changeUser, form, goToRoot]);

  const handleChangeEmail = useCallback(
    (text: string) => setForm({ ...form, email: text }),
    [setForm, form],
  );

  const handleChangePassword = useCallback(
    (text: string) => setForm({ ...form, password: text }),
    [setForm, form],
  );

  const disabled = !form.email || !form.password;

  return (
    <Row as={SafeAreaView} flex={1}>
      <Col flex={1} py={2}>
        <InputField
          autoCapitalize="none"
          autoFocus
          autoCorrect={false}
          placeholder=""
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          label="Эл. почта"
          errorLabel="Заполните обязательное поле!"
          onChangeText={handleChangeEmail}
        />
        <Box p={2} />
        <InputField
          autoCapitalize="none"
          autoFocus
          autoCorrect={false}
          placeholder=""
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry
          label="Пароль"
          errorLabel="Заполните обязательное поле!"
          onChangeText={handleChangePassword}
        />
        <Col flex={1} p={2} justifyContent="flex-end">
          <Row>
            <Button
              disabled={disabled}
              containerStyle={{ flex: 1 }}
              title={
                <>
                  <Text fontSize={20} background>
                    Войти
                  </Text>
                  <Ionicons
                    size={24}
                    name="ios-enter-outline"
                    style={{ position: "absolute", right: 16, color: "white" }}
                  />
                </>
              }
              onPress={handleSubmitLogin}
            />
          </Row>
          <Box p={2} />
          <Row>
            <Button
              disabled={disabled}
              containerStyle={{ flex: 1 }}
              title={
                <>
                  <Text fontSize={20} background>
                    Зарегистрироваться
                  </Text>
                  <Ionicons
                    name="person-add-outline"
                    size={24}
                    style={{ position: "absolute", right: 16, color: "white" }}
                  />
                </>
              }
              onPress={handleSubmitRegistration}
            />
          </Row>
        </Col>
      </Col>
    </Row>
  );
}
