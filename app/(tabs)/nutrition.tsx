import AppBackground from "@/components/AppBackground";
import Colors from "@/constants/colors";
import {
  generateNutritionInsight
} from "@/services/geminiApi";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getCurrentProduct } from "../../utils/currentProduct";

export default function NutritionScreen() {
  const { barcode } = useLocalSearchParams();
  console.log("NUTRITION BARCODE:", barcode);
const [energy, setEnergy] = useState("Loading...");
const [sugar, setSugar] = useState("Loading...");
const [fat, setFat] = useState("Loading...");
const [protein, setProtein] = useState("Loading...");
const [productName, setProductName] = useState("Loading...");
const [salt, setSalt] = useState("Loading...");

const [aiInsight, setAiInsight] =
  useState("Analyzing...");

  const [mainConcern, setMainConcern] = useState("");
const [goalAdvice, setGoalAdvice] = useState("");
const [recommendation, setRecommendation] = useState("");
const [overallVerdict, setOverallVerdict] = useState("");
const ICMR_SUGAR = 50;
const ICMR_FAT = 65;
const ICMR_PROTEIN = 50;
const ICMR_SALT = 5;
const sugarPercent = Math.round(
  (Number(sugar) / ICMR_SUGAR) * 100
);
const ICMR_CALORIES = 2000;
useEffect(() => {
  async function loadNutrition() {
    try {
    if (!barcode) return;
console.log("STEP 1");
  

    const product = await getCurrentProduct();
    console.log("STEP 2");

console.log(product);

console.log(product);

console.log(product.nutriments);

   console.log(
  "CURRENT PRODUCT:",
  product?.product_name
);

    if (product?.nutriments) {
      const n = product.nutriments;
      console.log("STEP 3", n);
setProductName(
  product.product_name ||
  product.product_name_en ||
  "Unknown Product"
);

      setEnergy(
  n["energy-kcal_100g"]
    ? Number(n["energy-kcal_100g"]).toFixed(0)
    : "N/A"
);

setSugar(
  n.sugars_100g
    ? Number(n.sugars_100g).toFixed(1)
    : "N/A"
);

setFat(
  n.fat_100g
    ? Number(n.fat_100g).toFixed(1)
    : "N/A"
);

setProtein(
  n.proteins_100g
    ? Number(n.proteins_100g).toFixed(1)
    : "N/A"
);

setSalt(
  n.salt_100g
    ? Number(n.salt_100g).toFixed(1)
    : "N/A"
);

console.log("STEP 4 - BEFORE GEMINI");

console.log(
  "GENERATING AI FOR:",
 product?.product_name
);

const insight =
  await generateNutritionInsight(
    String(n["energy-kcal_100g"] || "N/A"),
    String(n.sugars_100g || "N/A"),
    String(n.fat_100g || "N/A"),
    String(n.proteins_100g || "N/A"),
    String(n.salt_100g || "N/A")
  );

  console.log("STEP 5 - AFTER GEMINI");
setAiInsight(insight);

const concern =
  insight.match(/Main Concern:\s*([\s\S]*?)Health Goal:/)?.[1]?.trim() || "";

const goal =
  insight.match(/Health Goal:\s*([\s\S]*?)Recommendation:/)?.[1]?.trim() || "";

const advice =
  insight.match(/Recommendation:\s*([\s\S]*?)Overall Verdict:/)?.[1]?.trim() || "";

const finalVerdict =
  insight.match(/Overall Verdict:\s*([\s\S]*)/)?.[1]?.trim() || "";

setMainConcern(concern);
setGoalAdvice(goal);
setRecommendation(advice);
setOverallVerdict(finalVerdict);    }

console.log("STEP 6 - FINISHED");
  }   catch (error) {
    console.log("LOAD ERROR:", error);
  }
}


  loadNutrition();
}, [barcode]);
function getPercentage(
  value: number,
  limit: number
) {
  return Math.min(
    (value / limit) * 100,
    100
  );
}

function isAvailable(value: string) {
  return value !== "N/A";
}
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
        onPress={() =>
  router.navigate({
    pathname: "/result",
    params: {
      barcode: String(barcode),
    },
  })
}
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
          <Text style={styles.subtitle}>
  vs ICMR recommended daily intake
</Text>
          <View style={styles.card}>
<Text style={styles.productName}>
  {productName}
</Text>
           <View style={styles.nutritionCard}>
<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
  <Ionicons
    name="flame"
    size={22}
    color="#FF7043"
  />
  <Text style={styles.nutrientTitle}>
    Calories
  </Text>
</View>

  <Text style={styles.nutritionValue}>
  {isAvailable(energy)
    ? `${energy} kcal / 2000 kcal`
    : "Not Available"}
</Text>

  {isAvailable(energy) && (
  <View style={styles.progressTrack}>
    <View
      style={[
        styles.progressFill,
        {
          width: `${getPercentage(
            Number(energy),
            2000
          )}%`,
          backgroundColor:
            Number(energy) > 400
              ? "#D32F2F"
              : Number(energy) > 200
              ? "#F9A825"
              : "#43A047",
        },
      ]}
    />
  </View>
)}

  <Text style={styles.nutritionStatus}>
  {!isAvailable(energy)
    ? "⚪ Data unavailable"
    : Number(energy) > 400
    ? "High"
    : Number(energy) > 200
    ? "Moderate"
    : "Low"}
</Text>
</View>

           <View style={styles.nutritionCard}>
  <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  }}
>
  <Ionicons
    name="nutrition"
    size={22}
    color="#F9A825"
    style={{ marginRight: 8 }}
  />

  <Text style={styles.nutritionTitle}>
    Sugar
  </Text>
</View>

  <Text style={styles.nutritionValue}>
    {sugar} g / {ICMR_SUGAR} g
  </Text>

  <View style={styles.progressTrack}>
    <View
      style={[
        styles.progressFill,
        {
          width: `${getPercentage(
            Number(sugar),
            ICMR_SUGAR
          )}%`,
          backgroundColor:
  Number(sugar) >= ICMR_SUGAR
    ? "#D32F2F"
    : Number(sugar) >= ICMR_SUGAR * 0.7
    ? "#F9A825"
    : "#43A047",
        },
      ]}
    />
  </View>

  <Text style={styles.nutritionStatus}>
  {Number(sugar) > 15
    ? "High"
    : Number(sugar) > 5
    ? "Moderate"
    : "Low"}
</Text>
</View>

            <View style={styles.nutritionCard}>
<View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  }}
>
  <Ionicons
    name="water"
    size={22}
    color="#EF6C00"
    style={{ marginRight: 8 }}
  />

  <Text style={styles.nutritionTitle}>
    Fat
  </Text>
</View>

  <Text style={styles.nutritionValue}>
  {fat} g / {ICMR_FAT} g
</Text>

<View style={styles.progressTrack}>
  <View
    style={[
      styles.progressFill,
      {
        width: `${getPercentage(
          Number(fat),
          ICMR_FAT
        )}%`,
        backgroundColor:
  Number(fat) > 30
    ? "#D32F2F"
    : Number(fat) > 15
    ? "#F9A825"
    : "#43A047",
      },
    ]}
  />
</View>

  <Text style={styles.nutritionStatus}>
  {Number(fat) > 30
    ? "High"
    : Number(fat) > 15
    ? "Moderate"
    : "Low"}
</Text>
</View>

          <View style={styles.nutritionCard}>
  <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  }}
>
  <Ionicons
    name="fitness"
    size={22}
    color="#43A047"
    style={{ marginRight: 8 }}
  />

  <Text style={styles.nutritionTitle}>
    Protein
  </Text>
</View>

  <Text style={styles.nutritionValue}>
    {protein} g / {ICMR_PROTEIN} g
  </Text>

  <View style={styles.progressTrack}>
    <View
      style={[
        styles.progressFill,
        {
          width: `${getPercentage(
            Number(protein),
            ICMR_PROTEIN
          )}%`,
         backgroundColor:
  Number(protein) > 10
    ? "#43A047"
    : Number(protein) > 5
    ? "#F9A825"
    : "#D32F2F",
        },
      ]}
    />
  </View>

  <Text style={styles.nutritionStatus}>
    {Number(protein) > 10
      ? "Good"
      : Number(protein) > 5
      ? "Moderate"
      : "Low"}
  </Text>
</View>

            <View style={styles.nutritionCard}>
  <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  }}
>
  <Ionicons
    name="restaurant"
    size={22}
    color="#5C6BC0"
    style={{ marginRight: 8 }}
  />

  <Text style={styles.nutritionTitle}>
    Salt
  </Text>
</View>

  <Text style={styles.nutritionValue}>
  {salt} g / {ICMR_SALT} g
</Text>

<View style={styles.progressTrack}>
  <View
    style={[
      styles.progressFill,
      {
        width: `${getPercentage(
          Number(salt),
          ICMR_SALT
        )}%`,
        backgroundColor:
  Number(salt) > 1.5
    ? "#D32F2F"
    : Number(salt) > 0.5
    ? "#F9A825"
    : "#43A047",
      },
    ]}
  />
</View>
<Text style={styles.nutritionStatus}>
  {Number(salt) > 1.5
    ? "🔴 High"
    : Number(salt) > 0.5
    ? "🟡 Moderate"
    : "🟢 Low"}
</Text>
</View>
          </View>
          <View style={styles.insightCard}>
  <View style={styles.insightHeader}>
  <Ionicons
  name="fitness"
  size={24}
  color={Colors.forest}
  style={styles.icon}
/>

  <Text style={styles.insightTitle}>
    Personalized Health Insight
  </Text>
</View>

  <View style={styles.section}>
    <View style={styles.sectionHeader}>
  <Ionicons
  name="alert-circle"
  size={22}
  color="#E53935"
  style={{ marginRight: 10 }}
/>

  <Text style={styles.sectionHeading}>
    Main Concern
  </Text>
</View>

    <Text style={styles.insightText}>
      {mainConcern}
    </Text>
  </View>

  <View style={styles.section}>
    <View style={styles.sectionHeader}>
  <Ionicons
  name="flag"
  size={22}
  color="#FB8C00"
  style={styles.icon}
/>

  <Text style={styles.sectionHeading}>
    For Your Goals
  </Text>
</View>

    <Text style={styles.insightText}>
      {goalAdvice}
    </Text>
  </View>

  <View style={styles.section}>
   <View style={styles.sectionHeader}>
  <Ionicons
  name="bulb"
  size={22}
  color="#F9A825"
  style={styles.icon}
/>

  <Text style={styles.sectionHeading}>
    Recommendation
  </Text>
</View>

    <Text style={styles.insightText}>
      {recommendation}
    </Text>
  </View>

  <View style={styles.section}>
    <View style={styles.sectionHeader}>
  <Ionicons
  name="checkmark-circle"
  size={22}
  color="#43A047"
  style={styles.icon}
/>

  <Text style={styles.sectionHeading}>
    Overall Verdict
  </Text>
</View>

  <View
  style={{
    alignSelf: "flex-start",
    backgroundColor:
      overallVerdict === "Recommended"
        ? "#E8F5E9"
        : "#FDECEC",

    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 10,
  }}
>
  <Text
    style={{
      color:
        overallVerdict === "Recommended"
          ? "#2E7D32"
          : "#C62828",

      fontWeight: "700",
      fontSize: 18,
    }}
  >
    {overallVerdict}
  </Text>
</View>
  </View>
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
    top: 60,
    left: 8,
    zIndex: 10,
  },

  backText: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.forest,
  },

  pageTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.forest,
    textAlign: "center",
    marginTop: 90,
    marginBottom: 24,
  },

  subtitle: {
  textAlign: "center",
  color: Colors.ink2,
  fontSize: 16,
  marginBottom: 20,
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
  nutritionCard: {
  backgroundColor: "rgba(255,255,255,0.82)",
  borderRadius: 24,
  padding: 18,
  marginBottom: 14,
},

nutritionTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: Colors.forest,
},

nutritionValue: {
  fontSize: 22,
  fontWeight: "700",
  color: Colors.ink2,
  marginTop: 4,
},

nutritionStatus: {
  marginTop: 4,
  fontSize: 15,
  fontWeight: "600",
},
productName: {
  fontSize: 20,
  fontWeight: "600",
  color: Colors.ink2,
  textAlign: "center",
  marginBottom: 10,
},
progressTrack: {
  height: 8,
  backgroundColor: "#EAEAEA",
  borderRadius: 20,
  marginTop: 10,
  marginBottom: 8,
},

progressFill: {
  height: 8,
  borderRadius: 20,
},

insightCard: {
  backgroundColor: "rgba(255,255,255,0.88)",
  borderRadius: 24,
  padding: 20,
  marginTop: -10,
  marginBottom: 40,
},

insightTitle: {
  fontSize: 20,
  fontWeight: "700",
  color: Colors.forest,
  marginBottom: 10,
},

insightText: {
  fontSize: 15,
  lineHeight: 24,
  color: Colors.ink2,
},

section: {
  marginTop: 18,
},

sectionHeading: {
  fontSize: 17,
  fontWeight: "700",
  color: Colors.forest,
  marginBottom: 8,
},

verdict: {
  fontSize: 20,
  fontWeight: "700",
},

insightHeader: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 18,
},

sectionHeader: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
},

icon: {
  marginRight: 10,
},

headerRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 12,
},

headerIcon: {
  marginRight: 12,
},

sectionRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 24,
  marginBottom: 10,
},

sectionIcon: {
  marginRight: 10,
},
});