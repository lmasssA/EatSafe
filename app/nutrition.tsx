import Colors from "@/constants/colors";
import { getProductByBarcode } from "@/services/openFoodFacts";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.title}>Nutrition Facts</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.warmWhite,
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.forest,
    marginTop: 40,
    marginBottom: 24,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
  },

  item: {
    fontSize: 18,
    marginBottom: 16,
    color: Colors.ink2,
  },
});