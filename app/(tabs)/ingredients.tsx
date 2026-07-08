import AppBackground from "@/components/AppBackground";
import Colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { getCurrentProduct } from "../../utils/currentProduct";
export default function IngredientsScreen() {
  const { barcode } = useLocalSearchParams();
  console.log("INGREDIENT BARCODE:", barcode);

  const [ingredients, setIngredients] = useState<string[]>([]);
  useEffect(() => {
    async function loadIngredients() {
      if (!barcode) return;

      const product = await getCurrentProduct();

      console.log("INGREDIENT DATA:", product);
      if (
        product?.ingredients_text
      ) {
        const list =
          product.ingredients_text
            .split(",");

        setIngredients(list);
      }
    }

    loadIngredients();
  }, [barcode]);
  function getIngredientStatus(name: string) {
    const ingredient =
      name.toLowerCase();

    if (
      ingredient.includes("sugar") ||
ingredient.includes("sucre") ||
ingredient.includes("glucose") ||
ingredient.includes("fructose") ||
ingredient.includes("corn syrup") ||
ingredient.includes("cane sugar")
    ) {
      return {
        icon: "🔴",
        title: "High-risk ingredient",
        description:
          "May contribute to excess sugar intake and blood sugar spikes.",
      };
    }

    if (
      ingredient.includes("citric acid") ||
      ingredient.includes("acidity regulator") ||
      ingredient.includes("preservative")
    ) {
      return {
        icon: "🟡",
        title: "Use in moderation",
        description:
          "Common food additive used for preservation and flavor balance.",
      };
    }

    return {
      icon: "🟢",
      title: "Generally safe",
      description:
        "Common food ingredient with no major concerns for most people.",
    };
  }
  return (
  <>
  <AppBackground>
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10 }}
      >
        <Pressable
  onPress={() =>
  router.replace({
    pathname: "/result",
    params: {
      barcode: String(barcode),
    },
  })
}
  style={{
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 30,
    marginBottom: -80,
  }}
>
  <Ionicons
    name="arrow-back"
    size={24}
    color={Colors.forest}
  />

  <Text
    style={{
      fontSize: 18,
      fontWeight: "600",
      color: Colors.forest,
      marginLeft: 6,
    }}
  >
    Results
  </Text>
</Pressable>

        <Text style={styles.pageTitle}>
          Ingredients
        </Text>

        <View style={styles.card}>
          {ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => {
              const status =
                getIngredientStatus(ingredient);

              return (
                <View
                  key={index}
                  style={styles.ingredientCard}
                >
                  <Text style={styles.ingredientName}>
                    {status.icon} {ingredient.trim()}
                  </Text>

                  <Text style={styles.ingredientInfo}>
                    {status.title}
                  </Text>
                 
                  <Text style={styles.ingredientDescription}>
  {status.description}
</Text>
                </View>
              );
            })
          ) : (
            <Text style={styles.ingredient}>
              Ingredients information is not available for this product.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  </AppBackground>
  </>
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
    alignSelf: "center",
    marginTop: 90,
    fontSize: 32,
    fontWeight: "700",
    color: Colors.forest,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.88)",
    borderRadius: 28,
    padding: 24,
    marginTop: 20,
    marginBottom: 40,
  },

  ingredient: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 14,
    color: Colors.ink2,
  },

  ingredientCard: {
    backgroundColor: "rgba(255,255,255,0.65)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },

  ingredientName: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.forest,
  },

  ingredientInfo: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ink2,
  },
  ingredientDescription: {
  marginTop: 6,
  fontSize: 14,
  lineHeight: 22,
  color: Colors.ink2,
},

navText: {
  fontSize: 17,
  fontWeight: "600",
  color: Colors.forest,
  marginLeft: 4,
},

});