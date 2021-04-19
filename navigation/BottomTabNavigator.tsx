import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";

import HeaderTitle from "../components/HeaderTitle/HeaderTitle";
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
import { TabBarIcon, TabBarLabel } from "./TabBarIcon";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{ style: { backgroundColor: theme.palette.primary } }}
      initialRouteName="Pets"
    >
      <BottomTab.Screen
        name="AboutUs"
        component={AboutUsNavigator}
        options={{
          title: i18n("aboutUs.title"),
          tabBarLabel: ({ focused }) => (
            <TabBarLabel label={i18n("aboutUs.title")} focused={focused} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              src={require("../assets/images/icons/about-us.png")}
              focused={focused}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Pets"
        component={PetsNavigator}
        options={{
          title: i18n("pets.title"),
          tabBarLabel: ({ focused }) => (
            <TabBarLabel label={i18n("pets.title")} focused={focused} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              src={require("../assets/images/icons/pets.png")}
              focused={focused}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Lost"
        component={LostNavigator}
        options={{
          title: i18n("lost.title"),
          tabBarLabel: ({ focused }) => (
            <TabBarLabel label={i18n("lost.title")} focused={focused} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              src={require("../assets/images/icons/lost.png")}
              focused={focused}
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
            tabBarLabel: ({ focused }) => (
              <TabBarLabel label={i18n("pets.chat")} focused={focused} />
            ),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                src={require("../assets/images/icons/chat.png")}
                focused={focused}
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
          tabBarLabel: ({ focused }) => (
            <TabBarLabel label={i18n("profile.title")} focused={focused} />
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-person-circle-outline"
              size={24}
              style={{ opacity: focused ? 1 : 0.6 }}
              color={theme.palette.background}
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
          headerTitle: () => <HeaderTitle title="Профиль" />,
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
