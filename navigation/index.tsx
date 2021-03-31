import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useCallback } from "react";

import i18n from "../i18n";
import CatFormScreen from "../screens/CatFormScreen";
import DogFormScreen from "../screens/DogFormScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
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
  const getPetScreenOptions = useCallback(
    ({ route }: { route: RouteProp<RootStackParamList, "Pet"> }) => ({
      headerShown: true,
      headerTitle: route.params.petName,
    }),
    [],
  );

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: i18n("login.loginScreen"), headerShown: true }}
      />
      <RootStack.Screen
        name="Root"
        options={{ title: i18n("pets.title") }}
        component={BottomTabNavigator}
      />
      <RootStack.Screen
        name="Pet"
        options={getPetScreenOptions}
        component={PetScreen}
      />
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: `${i18n("common.oops")}!` }}
      />
      <RootStack.Screen
        name="CatFormScreen"
        component={CatFormScreen}
        options={{ title: i18n("form.formTitle"), headerShown: true }}
      />
      <RootStack.Screen
        name="DogFormScreen"
        component={DogFormScreen}
        options={{ title: i18n("form.formTitle"), headerShown: true }}
      />
    </RootStack.Navigator>
  );
}
