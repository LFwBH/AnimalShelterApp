import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useContext } from "react";

import Box, { Row } from "../../components/Box";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { useTheme } from "../../constants/styled-components";
import { AppContext } from "../../context/context";
import i18n from "../../i18n";
import { RootStackParamList } from "../../types/navigation";

interface ProfileScreenProps
  extends StackScreenProps<RootStackParamList, "Profile"> {}

function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { user, clearUser } = useContext(AppContext);

  const theme = useTheme();

  const handleRedirectToLogin = useCallback(async () => {
    if (!user?.token) {
      navigation.navigate("Login");
    }
  }, [navigation, user?.token]);

  return (
    <Row p={3} flex={1} alignItems="center" justifyContent="center">
      <Box>
        {!user?.token ? (
          <Button
            round
            buttonStyle={{
              paddingVertical: theme.space[2],
              paddingHorizontal: theme.space[4],
            }}
            title={
              <>
                <Text fontSize="lg" background>
                  {i18n("login.title")}
                </Text>
                <Box p={1} />
                <Ionicons
                  style={{ color: "white" }}
                  size={32}
                  name="ios-enter-outline"
                />
              </>
            }
            onPress={handleRedirectToLogin}
          />
        ) : (
          <Button
            round
            buttonStyle={{
              paddingVertical: theme.space[2],
              paddingHorizontal: theme.space[4],
            }}
            title={
              <>
                <Text fontSize="lg" background>
                  {i18n("logout.title")}
                </Text>
                <Box p={1} />
                <Ionicons
                  style={{ color: "white" }}
                  size={32}
                  name="ios-exit-outline"
                />
              </>
            }
            onPress={clearUser}
          />
        )}
      </Box>
    </Row>
  );
}

export default ProfileScreen;
