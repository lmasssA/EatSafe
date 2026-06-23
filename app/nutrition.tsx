import AppBackground from "@/components/AppBackground";
import Colors from "@/constants/colors";
import { getProductByBarcode } from "@/services/openFoodFacts";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NutritionScreen() {
  const { barcode } = useLocalSearchParams();
const [energy, setEnergy] = useState("Loading...");
const [sugar, setSugar] = useState("Loading...");
const [fat, setFat] = useState("Loading...");
const [protein, setProtein] = useState("Loading...");
const [salt, setSalt] = useState("Loading...");
useEffect(() => {
  async function loadNutrition() {
    if (!barcode) return;

    const data = await getProductByBarcode(String(barcode));

    if (data?.product?.nutriments) {
      const n = data.product.nutriments;

      setEnergy(String(n["energy-kcal_100g"] ?? "N/A"));
      setSugar(String(n.sugars_100g ?? "N/A"));
      setFat(String(n.fat_100g ?? "N/A"));
      setProtein(String(n.proteins_100g ?? "N/A"));
      setSalt(String(n.salt_100g ?? "N/A"));
    }
  }

  loadNutrition();
}, [barcode]);
  return (
  <AppBackground>
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>
          ← Results
        </Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.pageTitle}>
            Nutrition
          </Text>

          <View style={styles.card}>
            <Text style={styles.item}>
              Barcode: {barcode}
            </Text>

            <Text style={styles.item}>
              Energy: {energy} kcal
            </Text>

            <Text style={styles.item}>
              Sugar: {sugar} g
            </Text>

            <Text style={styles.item}>
              Fat: {fat} g
            </Text>

            <Text style={styles.item}>
              Protein: {protein} g
            </Text>

            <Text style={styles.item}>
              Salt: {salt} g
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  </AppBackground>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 8,
    zIndex: 10,
  },

  backText: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.forest,
  },

  pageTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: Colors.forest,
    textAlign: "center",
    marginTop: 90,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.82)",
    borderRadius: 32,
    padding: 24,
    marginBottom: 40,
  },

  item: {
    fontSize: 16,
    lineHeight: 30,
    marginBottom: 10,
    color: Colors.ink2,
  },
});