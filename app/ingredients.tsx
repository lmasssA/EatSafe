import Colors from "@/constants/colors";
import { getProductByBarcode } from "@/services/openFoodFacts";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
export default function IngredientsScreen() {
  const { barcode } = useLocalSearchParams();
console.log("INGREDIENT BARCODE:", barcode);

const [ingredients, setIngredients] = useState<string[]>([]);
useEffect(() => {
  async function loadIngredients() {
    if (!barcode) return;

    const data = await getProductByBarcode(
      String(barcode)
    );

    console.log("INGREDIENT DATA:", data?.product);
    if (
      data?.product?.ingredients_text
    ) {
      const list =
        data.product.ingredients_text
          .split(",");

      setIngredients(list);
    }
  }

  loadIngredients();
}, [barcode]);
return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Ingredients
      </Text>

      {ingredients.length > 0 ? (
  ingredients.map((ingredient, index) => (
    <Text
      key={index}
      style={styles.ingredient}
    >
      • {ingredient.trim()}
    </Text>
  ))
) : (
  <Text style={styles.ingredient}>
    Ingredients information is not available for this product.
  </Text>
)}
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

  ingredient: {
    fontSize: 18,
    marginBottom: 16,
    color: Colors.ink2,
  },
});