import { Tabs } from "expo-router";
import { NotebookPen } from "lucide-react-native";
import React from "react";

import Colors from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(notes)"
        options={{
          title: "Notes",
          tabBarIcon: ({ color }) => <NotebookPen color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}