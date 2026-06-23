import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import Colors from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: Colors.forest,

        tabBarInactiveTintColor: Colors.ink3,

        tabBarStyle: {
          backgroundColor: "#fff",
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
  name="result"
  options={{
    href: null,
  }}
/>

<Tabs.Screen
  name="ingredients"
  options={{
    href: null,
  }}
/>

<Tabs.Screen
  name="nutrition"
  options={{
    href: null,
  }}
/>
    </Tabs>
  );
}