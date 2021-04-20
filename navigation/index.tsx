import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useCallback } from "react";

import HeaderTitle from "../components/HeaderTitle/HeaderTitle";
import { useTheme } from "../constants/styled-components";
import i18n from "../i18n";
import AddPetScreen from "../screens/AddPetScreen";
import CatFormScreen from "../screens/CatFormScreen";
import DogFormScreen from "../screens/DogFormScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import LostPetScreen from "../screens/LostPetScreen/LostPetScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import PetScreen from "../screens/PetScreen";
import { RootStackParamList } from "../types/navigation";
import BottomTabNavigator from "./BottomTabNavigator";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const theme = useTheme();

  const getPetScreenOptions = useCallback(
    () => ({
      title: i18n("pet.title"),
      headerShown: true,
      headerTitle: () => <HeaderTitle logo={false} title="О питомце" />,
      headerStyle: {
        backgroundColor: theme.palette.primary,
        elevation: 0,
        shadowColor: theme.palette.primary,
      },
      headerTintColor: theme.palette.background,
    }),
    [theme.palette.background, theme.palette.primary],
  );

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name="Root"
        options={{ title: i18n("pets.title") }}
        component={BottomTabNavigator}
      />
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: i18n("login.title"),
          headerShown: true,
          headerTitle: () => <HeaderTitle logo={false} title="Анкета" />,
          headerStyle: {
            backgroundColor: theme.palette.primary,
            elevation: 0,
            shadowColor: theme.palette.primary,
          },
          headerTintColor: theme.palette.background,
        }}
      />
      <RootStack.Screen
        name="Pet"
        options={getPetScreenOptions}
        component={PetScreen}
      />
      <RootStack.Screen
        name="LostPet"
        options={{
          title: i18n("lost.title"),
          headerShown: true,
          headerTitle: () => <HeaderTitle logo={false} title="Анкета" />,
          headerStyle: {
            backgroundColor: theme.palette.primary,
            elevation: 0,
            shadowColor: theme.palette.primary,
          },
          headerTintColor: theme.palette.background,
        }}
        component={LostPetScreen}
      />
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: i18n("common.oops"), headerShown: true }}
      />
      <RootStack.Screen
        name="CatForm"
        component={CatFormScreen}
        options={{
          title: i18n("form.formTitle"),
          headerShown: true,
          headerTitle: () => <HeaderTitle logo={false} title="Анкета" />,
          headerStyle: {
            backgroundColor: theme.palette.primary,
            elevation: 0,
            shadowColor: theme.palette.primary,
          },
          headerTintColor: theme.palette.background,
        }}
      />
      <RootStack.Screen
        name="DogForm"
        component={DogFormScreen}
        options={{
          title: i18n("form.formTitle"),
          headerShown: true,
          headerTitle: () => <HeaderTitle logo={false} title="Анкета" />,
          headerStyle: {
            backgroundColor: theme.palette.primary,
            elevation: 0,
            shadowColor: theme.palette.primary,
          },
          headerTintColor: theme.palette.background,
        }}
      />
      <RootStack.Screen
        name="AddPet"
        component={AddPetScreen}
        options={{
          title: i18n("addPet.title"),
          headerShown: true,
          headerTitle: () => (
            <HeaderTitle logo={false} title={i18n("addPet.title")} />
          ),
          headerStyle: {
            backgroundColor: theme.palette.primary,
            elevation: 0,
            shadowColor: theme.palette.primary,
          },
          headerTintColor: theme.palette.background,
        }}
      />
    </RootStack.Navigator>
  );
}
