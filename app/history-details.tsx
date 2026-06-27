import AppBackground from "@/components/AppBackground";
import Colors from "@/constants/colors";
import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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

    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backButton}>
          ← History
        </Text>
      </Pressable>

      {data.imageUrl ? (
        <Image
          source={{ uri: data.imageUrl }}
          style={styles.productImage}
        />
      ) : null}

      <Text style={styles.title}>
        {data.name}
      </Text>

      <View style={styles.card}>
        
        <Text style={styles.sectionTitle}>
  📦 Product Information
</Text>


        <View style={styles.infoRow}>
  <Text style={styles.infoLabel}>
    🏷️ Brand
  </Text>

  <Text style={styles.infoValue}>
    {data.brand}
  </Text>
</View>


       <View style={styles.infoRow}>
  <Text style={styles.infoLabel}>
    ⭐ Health Grade
  </Text>

  <Text
    style={[
      styles.infoValue,
      {
        color:
          data.grade === "A"
            ? "#2E7D32"
            : data.grade === "B"
            ? "#43A047"
            : data.grade === "C"
            ? "#F9A825"
            : data.grade === "D"
            ? "#EF6C00"
            : "#C62828",
      },
    ]}
  >
    {data.grade}
  </Text>
</View>

       <View style={styles.infoRow}>
  <Text style={styles.infoLabel}>
    📅 Scan Date
  </Text>

  <Text style={styles.infoValue}>
    {data.scannedAt
      ? new Date(data.scannedAt).toLocaleDateString("en-IN") +
        " • " +
        new Date(data.scannedAt).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A"}
  </Text>
</View>

<Text style={styles.sectionTitle}>
  🥗 Nutrition
</Text>

        <View style={styles.infoRow}>
  <Text style={styles.infoLabel}>
    🔥 Calories
  </Text>

  <Text style={styles.infoValue}>
    {data.calories ?? "N/A"} kcal
  </Text>
</View>

        <View style={styles.infoRow}>
  <Text style={styles.infoLabel}>
    🍬 Sugar
  </Text>

  <Text style={styles.infoValue}>
    {data.sugar ?? "N/A"} g
  </Text>
</View>

        <View style={styles.infoRow}>
  <Text style={styles.infoLabel}>
    🧈 Fat
  </Text>

  <Text style={styles.infoValue}>
    {data.fat ?? "N/A"} g
  </Text>
</View>

        <View style={styles.infoRow}>
  <Text style={styles.infoLabel}>
    💪 Protein
  </Text>

  <Text style={styles.infoValue}>
    {data.protein ?? "N/A"} g
  </Text>
</View>

        <View style={styles.infoRow}>
  <Text style={styles.infoLabel}>
    🧂 Salt
  </Text>

  <Text style={styles.infoValue}>
    {data.salt ?? "N/A"} g
  </Text>
</View>

        <Text style={styles.ingredientsTitle}>
          Ingredients
        </Text>

        <View style={styles.ingredientsContainer}>
          {(data.ingredients ?? "")
            .split(",")
            .map((ingredient: string, index: number) => (
              <Text
                key={index}
                style={styles.ingredientItem}
              >
                •{" "}
                {ingredient
                  .replace(/_/g, "")
                  .trim()}
              </Text>
            ))}
        </View>
      </View>
    </ScrollView>
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

  productImage: {
  width: 140,
  height: 140,
  borderRadius: 20,
  alignSelf: "center",
  marginTop: 20,
  marginBottom: 20,
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
  color: Colors.ink2,
  marginBottom: 14,
},

ingredientsTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: Colors.forest,
  marginTop: 18,
  marginBottom: 14,
},

ingredientsContainer: {
  marginBottom: 20,
},

ingredientItem: {
  fontSize: 18,
  fontWeight: "600",
  color: Colors.ink2,
  lineHeight: 30,
  marginBottom: 10,
},

sectionTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: Colors.forest,
  marginTop: 20,
  marginBottom: 12,
},

infoRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 10,
  borderBottomWidth: 0.5,
  borderBottomColor: "#E5E7EB",
},

infoLabel: {
  fontSize: 18,
  fontWeight: "600",
  color: Colors.ink2,
},

infoValue: {
  fontSize: 18,
  fontWeight: "700",
  color: Colors.forest,
},
});