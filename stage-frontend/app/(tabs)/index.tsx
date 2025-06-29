import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import VideoList from "@/components/VideoList";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Speech Videos
      </ThemedText>
      <VideoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
});
