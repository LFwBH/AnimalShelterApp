import { Feather, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { useTheme } from "../constants/styled-components";
import i18n from "../i18n";
import AboutUsScreen from "../screens/AboutUsScreen";
import ChatBotScreen from "../screens/ChatBotScreen";
import LostPetsScreen from "../screens/LostPetsScreen/LostPetsScreen";
import PetsScreen from "../screens/PetsScreen";
import {
  AboutUsParamList,
  BottomTabParamList,
  ChatParamList,
  LostPetsParamList,
  PetsParamList,
} from "../types/navigation";

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
        name="AboutUs"
        component={AboutUsNavigator}
        options={{
          title: i18n("aboutUs.title"),
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
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
      <BottomTab.Screen
        name="Lost"
        component={LostNavigator}
        options={{
          title: i18n("lost.title"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="paw-outline" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          title: i18n("pets.chat"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-chatbox-outline" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const AboutUsStack = createStackNavigator<AboutUsParamList>();

function AboutUsNavigator() {
  return (
    <AboutUsStack.Navigator>
      <AboutUsStack.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{ headerTitle: i18n("aboutUs.title") }}
      />
    </AboutUsStack.Navigator>
  );
}

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

const LostStack = createStackNavigator<LostPetsParamList>();

function LostNavigator() {
  return (
    <LostStack.Navigator>
      <LostStack.Screen
        name="LostPets"
        component={LostPetsScreen}
        options={{ headerTitle: i18n("lost.title") }}
      />
    </LostStack.Navigator>
  );
}

const ChatStack = createStackNavigator<ChatParamList>();

function ChatNavigator() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Chat"
        component={ChatBotScreen}
        options={{ headerTitle: i18n("pets.chat") }}
      />
    </ChatStack.Navigator>
  );
}
