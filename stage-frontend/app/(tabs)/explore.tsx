import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        About Stage
      </ThemedText>
      <ThemedText style={styles.description}>
        Stage is an app where users are given short videos to roleplay the
        speech.
      </ThemedText>
      <ThemedText style={styles.instruction}>
        Tap on any video to practice your speech roleplay.
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  instruction: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
});
