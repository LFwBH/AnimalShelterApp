import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { useTheme } from "../constants/styled-components";
import i18n from "../i18n";
import PetsScreen from "../screens/PetsScreen";
import { BottomTabParamList, PetsParamList } from "../types/navigation";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        inactiveTintColor: theme.palette.primary,
        activeTintColor: theme.palette.accentDark,
      }}
      initialRouteName="Pets"
    >
      <BottomTab.Screen
        name="Pets"
        component={PetsNavigator}
        options={{
          title: i18n("pets.title"),
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const PetsStack = createStackNavigator<PetsParamList>();

function PetsNavigator() {
  return (
    <PetsStack.Navigator>
      <PetsStack.Screen
        name="Pets"
        component={PetsScreen}
        options={{ headerTitle: i18n("pets.title") }}
      />
    </PetsStack.Navigator>
  );
}
