import AppBackground from "@/components/AppBackground";
import Colors from "@/constants/colors";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HistoryDetailsScreen() {
  const { scan } = useLocalSearchParams();

  const data = scan
    ? JSON.parse(scan as string)
    : null;

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>No data found.</Text>
      </View>
    );
  }
  return (
    <AppBackground>
        <Stack.Screen
  options={{
    headerShown: false,
  }}
/>
      <View style={styles.container}>
        <Pressable
          onPress={() => router.back()}
        >
          <Text style={styles.backButton}>
            ← History
          </Text>
        </Pressable>

        <Text style={styles.title}>
          {data.name}
        </Text>

        <View style={styles.card}>
          <Text style={styles.item}>
            Brand: {data.brand}
          </Text>

          <Text style={styles.item}>
            Grade: {data.grade}
          </Text>

          <Text style={styles.item}>
            Sugar: {data.sugar ?? "N/A"} g
          </Text>

          <Text style={styles.item}>
            Fat: {data.fat ?? "N/A"} g
          </Text>

          <Text style={styles.item}>
            Protein: {data.protein ?? "N/A"} g
          </Text>

          <Text style={styles.item}>
            Salt: {data.salt ?? "N/A"} g
          </Text>

          <Text style={styles.item}>
            Ingredients:
          </Text>

          <Text style={styles.ingredients}>
            {data.ingredients ?? "Not available"}
          </Text>
        </View>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  backButton: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: "600",
    color: Colors.forest,
  },

  title: {
  fontSize: 30,
  fontWeight: "700",
  color: Colors.forest,
  textAlign: "center",
  marginTop: 40,
  marginBottom: 20,
},

  card: {
    backgroundColor: "rgba(255,255,255,0.82)",
    borderRadius: 32,
    padding: 20,
  },

  item: {
    fontSize: 18,
    marginBottom: 12,
    color: Colors.ink2,
  },

  ingredients: {
    marginTop: 8,
    lineHeight: 24,
    color: Colors.ink2,
  },
});