import { Stack } from "expo-router";
import React from "react";

export default function NotesLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Notes",
          headerLargeTitle: true,
        }} 
      />
      <Stack.Screen 
        name="add" 
        options={{ 
          title: "New Note",
          presentation: "modal",
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ 
          title: "Edit Note",
        }} 
      />
    </Stack>
  );
}