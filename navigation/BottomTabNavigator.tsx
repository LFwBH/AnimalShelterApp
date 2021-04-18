import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { darken } from "polished";
import React from "react";
import { Image, Platform } from "react-native";

import HeaderTitle from "../components/HeaderTitle/HeaderTitle";
import Text from "../components/Text";
import { useTheme } from "../constants/styled-components";
import i18n from "../i18n";
import AboutUsScreen from "../screens/AboutUsScreen";
import ChatBotScreen from "../screens/ChatBotScreen";
import LostPetsScreen from "../screens/LostPetsScreen";
import PetsScreen from "../screens/PetsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import {
  AboutUsParamList,
  BottomTabParamList,
  ChatParamList,
  LostPetsParamList,
  PetsParamList,
  ProfileParamList,
} from "../types/navigation";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        inactiveTintColor: darken(0.1, theme.palette.background),
        activeTintColor: theme.palette.background,
        style: { backgroundColor: theme.palette.primary },
      }}
      initialRouteName="Pets"
    >
      <BottomTab.Screen
        name="AboutUs"
        component={AboutUsNavigator}
        options={{
          title: i18n("aboutUs.title"),
          tabBarLabel: () => (
            <Text background fontSize={11}>
              О нас
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/icons/about-us.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: color,
              }}
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
            <Text background fontSize={11}>
              Питомцы
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/icons/main.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: color,
              }}
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
            <Text background fontSize={11}>
              Потеряшки
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/icons/lost.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      {Platform.OS !== "ios" && (
        <BottomTab.Screen
          name="Chat"
          component={ChatNavigator}
          options={{
            title: i18n("pets.chat"),
            tabBarLabel: () => (
              <Text background fontSize={11}>
                Чат
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../assets/images/icons/chat.png")}
                style={{ width: 24, height: 24, tintColor: color }}
                resizeMode="contain"
              />
            ),
          }}
        />
      )}
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          title: i18n("profile.title"),
          tabBarLabel: () => (
            <Text background fontSize={11}>
              Профиль
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="ios-person-circle-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const AboutUsStack = createStackNavigator<AboutUsParamList>();

function AboutUsNavigator() {
  const theme = useTheme();

  return (
    <AboutUsStack.Navigator>
      <AboutUsStack.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{
          headerTitle: () => <HeaderTitle title="О нас" />,
          headerStyle: {
            backgroundColor: theme.palette.primary,
            shadowColor: theme.palette.primary,
            elevation: 0,
          },
          headerTintColor: theme.palette.background,
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
  const theme = useTheme();

  return (
    <PetsStack.Navigator>
      <PetsStack.Screen
        name="Pets"
        component={PetsScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Питомцы" />,
          headerStyle: {
            backgroundColor: theme.palette.primary,
            shadowColor: theme.palette.primary,
            elevation: 0,
          },
          headerTintColor: theme.palette.background,
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
  const theme = useTheme();

  return (
    <LostStack.Navigator>
      <LostStack.Screen
        name="LostPets"
        component={LostPetsScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Потеряшки" />,
          headerStyle: {
            backgroundColor: theme.palette.primary,
            shadowColor: theme.palette.primary,
            elevation: 0,
          },
          headerTintColor: theme.palette.background,
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
  const theme = useTheme();

  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Chat"
        component={ChatBotScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Чат" />,
          headerStyle: {
            backgroundColor: theme.palette.primary,
            shadowColor: theme.palette.primary,
            elevation: 0,
          },
          headerTintColor: theme.palette.background,
          headerTitleStyle: {
            fontWeight: "bold",
            alignSelf: "center",
          },
        }}
      />
    </ChatStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  const theme = useTheme();

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: i18n("profile.title"),
          headerStyle: {
            backgroundColor: theme.palette.primary,
            shadowColor: theme.palette.primary,
            elevation: 0,
          },
          headerTintColor: theme.palette.background,
          headerTitleStyle: {
            fontWeight: "bold",
            alignSelf: "center",
          },
        }}
      />
    </ProfileStack.Navigator>
  );
}
