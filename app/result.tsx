import Colors from "@/constants/colors";
import { getProductByBarcode } from "@/services/openFoodFacts";
import { calculateGrade, generateSummary } from "@/utils/aiEngine";
import { saveScan } from "@/utils/storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ResultScreen() {
  const { barcode } = useLocalSearchParams();

  const [productName, setProductName] = useState("Product Found");
  const [brand, setBrand] = useState("");
  const [grade, setGrade] = useState("A");
  const [summary, setSummary] = useState("");
  const [imageUrl, setImageUrl] = useState("");

const [sugar, setSugar] = useState(0);
const [fat, setFat] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      if (!barcode) return;

      const data = await getProductByBarcode(String(barcode));

      if (data?.product) {
        console.log("NUTRIMENTS:", data.product.nutriments);
console.log("INGREDIENTS:", data.product.ingredients_text);
        setProductName(
          data.product.product_name ||
            data.product.product_name_en ||
            "Unknown Product"
        );

        setImageUrl(
          data.product.image_front_url || ""
        );

        setSugar(
  data.product.nutriments?.sugars_100g || 0
);

setFat(
  data.product.nutriments?.fat_100g || 0
);
        setBrand(
          data.product.brands || ""
        );

        const calculatedGrade =
          calculateGrade(data.product);

        setGrade(calculatedGrade);

        setSummary(
          generateSummary(calculatedGrade)
        );

        await saveScan({
          name:
            data.product.product_name ||
            data.product.product_name_en ||
            "Unknown Product",

          brand:
            data.product.brands || "",

          grade: calculatedGrade,

          barcode: String(barcode),

          scannedAt:
            new Date().toISOString(),
        });
      }
    }

    loadProduct();
  }, [barcode]);

  const gradeColor =
    grade === "A"
      ? "#2E7D32"
      : grade === "B"
      ? "#6B8F5E"
      : grade === "C"
      ? "#F57C00"
      : "#C62828";

  return (
    <View style={styles.container}>
    
      

      <View
  style={{
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 12,
  }}
>
  {sugar > 15 ? (
  <View
    style={{
      backgroundColor: "#FDECEC",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    }}
  >
    <Text
      style={{
        color: "#C62828",
        fontWeight: "600",
      }}
    >
      🔴 High Sugar
    </Text>
  </View>
) : (
  <View
    style={{
      backgroundColor: "#E8F5E9",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    }}
  >
    <Text
      style={{
        color: "#2E7D32",
        fontWeight: "600",
      }}
    >
      🟢 Low Sugar
    </Text>
  </View>
)}

  {fat > 10 ? (
  <View
    style={{
      backgroundColor: "#FDECEC",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    }}
  >
    <Text
      style={{
        color: "#C62828",
        fontWeight: "600",
      }}
    >
      🔴 High Fat
    </Text>
  </View>
) : (
  <View
    style={{
      backgroundColor: "#E8F5E9",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    }}
  >
    <Text
      style={{
        color: "#2E7D32",
        fontWeight: "600",
      }}
    >
      🟢 Low Fat
    </Text>
  </View>
)}
</View>

      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : null}

      <Text style={styles.title}>
        {productName}
      </Text>

      <Text style={styles.subtitle}>
        {brand}
      </Text>
<View
        style={[
          styles.gradeCircle,
          { borderColor: gradeColor },
        ]}
      >
        <Text
          style={[
            styles.gradeLetter,
            { color: gradeColor },
          ]}
        >
          {grade}
        </Text>

        <Text
          style={[
            styles.gradeText,
            { color: gradeColor },
          ]}
        >
          {grade === "A"
            ? "Excellent"
            : grade === "B"
            ? "Good"
            : grade === "C"
            ? "Moderate"
            : "Poor"}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          AI Summary
        </Text>

        <Text style={styles.body}>
          {summary}
        </Text>

        <Pressable
          style={styles.ingredientsButton}
          onPress={() =>
            router.push({
              pathname: "/ingredients",
              params: {
                barcode: String(barcode),
              },
            })
          }
        >
          <Text style={styles.buttonText}>
            View Ingredients
          </Text>
        </Pressable>

        <Pressable
          style={styles.nutritionButton}
          onPress={() =>
            router.push({
              pathname: "/nutrition",
              params: {
                barcode: String(barcode),
              },
            })
          }
        >
          <Text style={styles.buttonText}>
            View Nutrition
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.warmWhite,
    padding: 24,
    justifyContent: "center",
  },

  gradeCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  gradeLetter: {
    fontSize: 72,
    fontWeight: "bold",
  },

  gradeText: {
    fontSize: 20,
    fontWeight: "600",
  },

  image: {
    width: 160,
    height: 160,
    alignSelf: "center",
    borderRadius: 16,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: Colors.forest,
    marginTop: 10,
  },

  subtitle: {
    textAlign: "center",
    color: Colors.ink2,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
  },

  cardTitle: {
    fontWeight: "700",
    fontSize: 20,
    color: Colors.forest,
    marginBottom: 12,
  },

  body: {
    color: Colors.ink2,
    lineHeight: 24,
  },

  ingredientsButton: {
    backgroundColor: Colors.forest,
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },

  nutritionButton: {
    backgroundColor: Colors.sage,
    padding: 15,
    borderRadius: 12,
    marginTop: 12,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
});