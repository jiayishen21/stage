import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { videoApi, Video as VideoType } from "../services/api";

export default function VideoList() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);

  const loadVideos = async () => {
    try {
      const videoList = await videoApi.getAll();
      setVideos(videoList);
    } catch (error) {
      console.error("Error loading videos:", error);
      Alert.alert("Error", "Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  const handleVideoPress = (videoId: number) => {
    setPlayingVideoId(playingVideoId === videoId ? null : videoId);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const renderVideoItem = ({ item }: { item: VideoType }) => {
    const isPlaying = playingVideoId === item.id;
    return (
      <View style={styles.videoItem}>
        <TouchableOpacity
          style={styles.videoHeader}
          onPress={() => handleVideoPress(item.id)}
        >
          <Text style={styles.videoTitle}>{item.title}</Text>
          {item.description && (
            <Text style={styles.videoDescription}>{item.description}</Text>
          )}
        </TouchableOpacity>
        {isPlaying && (
          <Video
            source={{ uri: item.url }}
            style={styles.video}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            isLooping={false}
          />
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={videos}
      renderItem={renderVideoItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
      ListEmptyComponent={
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No videos available</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  videoItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  videoHeader: {
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  videoDescription: {
    fontSize: 14,
    color: "#666",
  },
  video: {
    width: "100%",
    height: 200,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
