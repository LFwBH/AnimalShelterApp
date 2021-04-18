import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image, Text } from "react-native";
import { height } from "styled-system";

import HeaderTitle from "../components/HeaderTitle/HeaderTitle";
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
        activeTintColor: theme.palette.background,
        style: {
          backgroundColor: "#6B96E4",
          shadowColor: "#6B96E4",
        },
      }}
      initialRouteName="Pets"
    >
      <BottomTab.Screen
        name="AboutUs"
        component={AboutUsNavigator}
        options={{
          title: i18n("aboutUs.title"),
          tabBarLabel: () => (
            <Text style={{ fontSize: 11, color: "white" }}>О нас</Text>
          ),
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/icons/about-us.png")}
              style={{ width: 24, height: 24, tintColor: "white" }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Pets"
        component={PetsNavigator}
        options={{
          title: i18n("pets.title"),
          tabBarLabel: () => (
            <Text style={{ fontSize: 11, color: "white" }}>Питомцы</Text>
          ),
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/icons/main.png")}
              style={{ width: 24, height: 24, tintColor: "white" }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Lost"
        component={LostNavigator}
        options={{
          title: i18n("lost.title"),
          tabBarLabel: () => (
            <Text style={{ fontSize: 11, color: "white" }}>Потеряшки</Text>
          ),
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/icons/lost.png")}
              style={{ width: 24, height: 24, tintColor: "white" }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          title: i18n("pets.chat"),
          tabBarLabel: () => (
            <Text style={{ fontSize: 11, color: "white" }}>Чат</Text>
          ),
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/icons/chat.png")}
              style={{ width: 24, height: 24, tintColor: "white" }}
              resizeMode="contain"
            />
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
        options={{
          headerTitle: (props) => <HeaderTitle title="О нас" />,
          headerStyle: {
            backgroundColor: "#6B96E4",
            elevation: 0,
            shadowColor: "#6B96E4",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            alignSelf: "center",
          },
        }}
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
        options={{
          headerTitle: (props) => <HeaderTitle title="Питомцы" />,
          headerStyle: {
            backgroundColor: "#6B96E4",
            elevation: 0,
            shadowColor: "#6B96E4",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            alignSelf: "center",
          },
        }}
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
        options={{
          headerTitle: (props) => <HeaderTitle title="Потеряшки" />,
          headerStyle: {
            backgroundColor: "#6B96E4",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            alignSelf: "center",
          },
        }}
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
        options={{
          headerTitle: (props) => <HeaderTitle title="Чат" />,
          headerStyle: {
            backgroundColor: "#6B96E4",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            alignSelf: "center",
          },
        }}
      />
    </ChatStack.Navigator>
  );
}
