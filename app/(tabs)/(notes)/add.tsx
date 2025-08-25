import { router } from "expo-router";
import { Check, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNotes } from "@/hooks/notes-store";

export default function AddNoteScreen() {
  const { addNote } = useNotes();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSave = () => {
    if (!title.trim() && !body.trim()) {
      Alert.alert("Empty Note", "Please add some content to save the note.");
      return;
    }

    addNote({
      title: title.trim() || "Untitled",
      body: body.trim(),
    });

    router.back();
  };

  const handleCancel = () => {
    if (title.trim() || body.trim()) {
      Alert.alert(
        "Discard Changes",
        "Are you sure you want to discard this note?",
        [
          { text: "Keep Editing", style: "cancel" },
          { text: "Discard", style: "destructive", onPress: () => router.back() },
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleCancel}>
          <X size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Note</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleSave}>
          <Check size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <TextInput
            style={styles.titleInput}
            placeholder="Note title..."
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#C7C7CC"
            multiline
            textAlignVertical="top"
          />
          
          <TextInput
            style={styles.bodyInput}
            placeholder="Start writing..."
            value={body}
            onChangeText={setBody}
            placeholderTextColor="#C7C7CC"
            multiline
            textAlignVertical="top"
            scrollEnabled={false}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
    minHeight: 40,
    textAlignVertical: "top",
  },
  bodyInput: {
    fontSize: 16,
    color: "#000",
    lineHeight: 24,
    minHeight: 200,
    textAlignVertical: "top",
  },
});