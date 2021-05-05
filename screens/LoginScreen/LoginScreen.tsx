import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useContext, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { useMutation } from "react-query";

import { login, register } from "../../api/auth";
import Box, { Col, Row } from "../../components/Box";
import Button from "../../components/Button";
import InputField from "../../components/InputField/InputField";
import Text from "../../components/Text";
import { useTheme } from "../../constants/styled-components";
import { AppContext } from "../../context/context";
import { Auth } from "../../models/Auth";
import { RootStackParamList } from "../../types/navigation";

interface LoginScreenProps
  extends StackScreenProps<RootStackParamList, "Login"> {}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { changeUser } = useContext(AppContext);

  const theme = useTheme();

  const registerMutation = useMutation((payload: Auth) => register(payload));
  const loginMutation = useMutation((payload: Auth) => login(payload));

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
      const { data } = await registerMutation.mutateAsync(form);

      await changeUser({
        email: form.email,
        token: data.token,
      });

      goToRoot();
    } catch {}
  }, [changeUser, form, goToRoot, registerMutation]);

  const handleSubmitLogin = useCallback(async () => {
    try {
      const { data } = await loginMutation.mutateAsync(form);

      await changeUser({
        email: form.email,
        token: data.token,
      });

      goToRoot();
    } catch {}
  }, [changeUser, form, goToRoot, loginMutation]);

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
      <Col mt="50%" flex={1} py={2}>
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
        <Col flex={1} p={2}>
          <Row>
            <Button
              disabled={disabled || loginMutation.isLoading}
              containerStyle={{ flex: 1 }}
              buttonStyle={{
                paddingTop: theme.space[2],
                paddingBottom: theme.space[2],
              }}
              title={
                <>
                  <Text fontSize="lg" background>
                    Войти
                  </Text>
                  {!loginMutation.isLoading && (
                    <Ionicons
                      size={24}
                      name="ios-enter-outline"
                      style={{
                        position: "absolute",
                        right: 16,
                        color: "white",
                      }}
                    />
                  )}

                  {loginMutation.isLoading && (
                    <ActivityIndicator
                      style={{
                        position: "absolute",
                        right: 16,
                      }}
                    />
                  )}
                </>
              }
              onPress={handleSubmitLogin}
            />
          </Row>
          <Box p={2} />
          <Row>
            <Button
              disabled={disabled || registerMutation.isLoading}
              containerStyle={{ flex: 1 }}
              buttonStyle={{
                paddingTop: theme.space[2],
                paddingBottom: theme.space[2],
              }}
              title={
                <>
                  <Text fontSize="lg" background>
                    Зарегистрироваться
                  </Text>
                  {!registerMutation.isLoading && (
                    <Ionicons
                      name="person-add-outline"
                      size={24}
                      style={{
                        position: "absolute",
                        right: 16,
                        color: "white",
                      }}
                    />
                  )}
                  {registerMutation.isLoading && (
                    <ActivityIndicator
                      style={{
                        position: "absolute",
                        right: 16,
                      }}
                    />
                  )}
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
