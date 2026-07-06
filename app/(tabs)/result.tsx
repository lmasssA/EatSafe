import AppBackground from "@/components/AppBackground";
import Colors from "@/constants/colors";
import { getProductByBarcode } from "@/services/openFoodFacts";
import { calculateGrade, generateSummary } from "@/utils/aiEngine";
import { saveCurrentProduct } from "@/utils/currentProduct";
import { saveScan } from "@/utils/storage";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResultScreen() {
  const { barcode } = useLocalSearchParams();
  console.log("RESULT BARCODE:", barcode);

  const [productName, setProductName] = useState("Product Found");
  const [brand, setBrand] = useState("");
  const [grade, setGrade] = useState("A");
  const [summary, setSummary] = useState("");
  const [mainConcern, setMainConcern] = useState("");
const [healthGoalInsight, setHealthGoalInsight] = useState("");
const [recommendation, setRecommendation] = useState("");
const [overallVerdict, setOverallVerdict] = useState("");
  const [imageUrl, setImageUrl] = useState("");

const [sugar, setSugar] = useState(0);
const [fat, setFat] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      if (!barcode) return;

      const data = await getProductByBarcode(String(barcode));

      if (data?.product) {
        await saveCurrentProduct(data.product);
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

  calories:
  data.product.nutriments?.["energy-kcal_100g"] ?? "N/A",

  sugar:
    data.product.nutriments?.sugars_100g ?? "N/A",

  fat:
    data.product.nutriments?.fat_100g ?? "N/A",

  protein:
    data.product.nutriments?.proteins_100g ?? "N/A",

  salt:
    data.product.nutriments?.salt_100g ?? "N/A",

  ingredients:
    data.product.ingredients_text ?? "Not available",

  imageUrl:
    data.product.image_front_url ?? "",

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
    <AppBackground>
    <>
  <Stack.Screen
    options={{
      headerShown: false,
    }}
  />
    <ScrollView
  style={styles.container}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingBottom: 120,
  }}
>
     <View style={styles.topBar}>
  <TouchableOpacity
  onPress={() => router.navigate("/scan")}
>
  <Text style={styles.navText}>
    ← Scan
  </Text>
</TouchableOpacity>

</View>

<Text style={styles.resultsTitle}>
  Results
</Text>
<View style={styles.heroCard}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : null}

      <Text style={styles.title}>
        {productName}
      </Text>

      <Text style={styles.subtitle}>
        {brand}
      </Text>
</View>
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
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          AI Summary
        </Text>

        <Text style={styles.body}>
          {summary}
        </Text>

        <Pressable
          style={styles.ingredientsButton}
          onPress={() => {
  console.log("OPENING INGREDIENTS WITH:", barcode);

  router.push({
    pathname: "/ingredients",
    params: {
      barcode: String(barcode),
    },
  });
}}
        >
          <Text style={styles.buttonText}>
            View Ingredients
          </Text>
        </Pressable>

        <Pressable
          style={styles.nutritionButton}
          onPress={() => {
  console.log("OPENING NUTRITION WITH:", barcode);

  router.push({
    pathname: "/nutrition",
    params: {
      barcode: String(barcode),
    },
  });
}}
        >
          <Text style={styles.buttonText}>
            View Nutrition
          </Text>
        </Pressable>
      </View>
    </ScrollView>
</>
</AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "transparent",
  padding: 24,
  paddingTop: 80,
},
heroCard: {
    alignItems: "center",
    marginBottom: 3,
  },
resultsTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.forest,
    alignSelf: "flex-start",
    marginBottom: 24,
  },

  gradeCircle: {
  width: 140,
  height: 140,
  borderRadius: 70,
  borderWidth: 3,
  alignSelf: "center",
  justifyContent: "center",
  alignItems: "center",
  marginTop: -10,
  marginBottom: 20,
},

  gradeLetter: {
    fontSize: 56,
    fontWeight: "bold",
  },

  gradeText: {
    fontSize: 16,
    fontWeight: "600",
  },

  image: {
  width: 140,
  height: 140,
  alignSelf: "center",
  borderRadius: 16,
  marginBottom: 16,
  backgroundColor: "white",
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
topBar: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
},

navText: {
  fontSize: 17,
  fontWeight: "600",
  color: Colors.forest,
},

card: {
  backgroundColor: "rgba(255,255,255,0.82)",
  borderRadius: 32,
  padding: 24,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.08,
  shadowRadius: 10,

  elevation: 4,
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