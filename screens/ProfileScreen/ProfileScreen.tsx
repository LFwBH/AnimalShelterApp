import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useContext } from "react";
import { Button } from "react-native-elements";

import Box, { Row } from "../../components/Box";
import Text from "../../components/Text";
import { AppContext } from "../../context/context";
import i18n from "../../i18n";
import { RootStackParamList } from "../../types/navigation";

interface ProfileScreenProps
  extends StackScreenProps<RootStackParamList, "Profile"> {}

function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { user, clearUser } = useContext(AppContext);

  const handleRedirectToLogin = useCallback(async () => {
    if (!user?.token) {
      navigation.navigate("Login");
    }
  }, [navigation, user?.token]);

  return (
    <Row p={3} flex={1}>
      {!user?.token ? (
        <Button
          title={
            <>
              <Text background>{i18n("login.title")}</Text>
              <Box p={1} />
              <Ionicons
                style={{ color: "white" }}
                size={24}
                name="ios-enter-outline"
              />
            </>
          }
          onPress={handleRedirectToLogin}
        />
      ) : (
        <Button
          title={
            <>
              <Text background>{i18n("logout.title")}</Text>
              <Box p={1} />
              <Ionicons
                style={{ color: "white" }}
                size={24}
                name="ios-exit-outline"
              />
            </>
          }
          onPress={clearUser}
        />
      )}
    </Row>
  );
}

export default ProfileScreen;
