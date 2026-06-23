import Colors from "@/constants/colors";
import { getScanHistory, clearHistory } from "@/utils/storage";
import AppBackground from "@/components/AppBackground";
import { useFocusEffect } from "expo-router";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);

  async function loadHistory() {
    const data = await getScanHistory();
    setHistory(data);
  }

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  async function handleClearHistory() {
    await clearHistory();
    setHistory([]);
  }

  return (
     <AppBackground>
    <View style={styles.container}>
      <Text style={styles.title}>
        Recent Scans
      </Text>

      <Pressable
        style={styles.clearButton}
        onPress={handleClearHistory}
      >
        <Text style={styles.clearText}>
          Clear History
        </Text>
      </Pressable>

      <FlatList
  data={history}
  keyExtractor={(item, index) =>
    `${item.barcode}-${index}`
  }
  renderItem={({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/history-details",
          params: {
            scan: JSON.stringify(item),
          },
        })
      }
    >
      <Text style={styles.product}>
        {item.name}
      </Text>

      <Text style={styles.brand}>
        {item.brand}
      </Text>

      <Text style={styles.grade}>
        Grade {item.grade}
      </Text>
    </Pressable>
  )}
/>
     
    </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: "transparent",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.forest,
    marginTop: 40,
    marginBottom: 20,
  },

  clearButton: {
    backgroundColor: "#C62828",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },

  clearText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.82)",
    padding: 16,
    borderRadius: 32,
    marginBottom: 12,
  },

  product: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.forest,
  },

  brand: {
    color: Colors.ink2,
    marginTop: 4,
  },

  grade: {
    marginTop: 8,
    fontWeight: "700",
  },
});