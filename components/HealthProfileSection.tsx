import Colors from "@/constants/colors";
import {
  getHealthProfile,
  saveHealthProfile,
} from "@/utils/healthStorage";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const HEALTH_CONDITIONS = [
  { icon: "water", color: "#4CAF50", name: "Diabetes" },
  { icon: "heart", color: "#E53935", name: "Heart Disease" },
  { icon: "pulse", color: "#D32F2F", name: "High Blood Pressure" },
  { icon: "flask", color: "#43A047", name: "High Cholesterol" },
  { icon: "medkit", color: "#8D6E63", name: "Kidney Disease" },
  { icon: "woman", color: "#F48FB1", name: "Pregnancy" },
];

const DIETARY_PREFERENCES = [
  { icon: "leaf", color: "#43A047", name: "Vegetarian" },
  { icon: "flower-outline", color: "#66BB6A", name: "Vegan" },
  { icon: "cafe", color: "#8D6E63", name: "Lactose Intolerant" },
  { icon: "restaurant", color: "#F9A825", name: "Gluten-Free" },
  { icon: "warning", color: "#FF9800", name: "Nut Allergy" },
];

const HEALTH_GOALS = [
  { icon: "barbell", color: "#607D8B", name: "Lose Weight" },
  { icon: "fitness", color: "#43A047", name: "Gain Muscle" },
  { icon: "restaurant", color: "#2E7D32", name: "Eat Healthier" },
  { icon: "heart-circle", color: "#E53935", name: "Maintain Health" },
];

export default function HealthProfileScreen() {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState<string[]>([]);
  const [selectedHealthGoal, setSelectedHealthGoal] = useState("");

useEffect(() => {
  async function loadProfile() {
    const savedProfile = await getHealthProfile();

    setSelectedConditions(savedProfile.conditions ?? []);
    setSelectedDietaryPreferences(
      savedProfile.dietaryPreferences ?? []
    );
    setSelectedHealthGoal(savedProfile.healthGoal ?? "");
    setSelectedHealthGoal(
  savedProfile.healthGoal ?? ""
);
  }

  loadProfile();
}, []);

useEffect(() => {
  saveHealthProfile({
  conditions: selectedConditions,
  dietaryPreferences: selectedDietaryPreferences,
  healthGoal: selectedHealthGoal,
});
}, [
  selectedConditions,
  selectedDietaryPreferences,
  selectedHealthGoal,
]);
  
  return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >

<View style={styles.infoCard}>
  <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  }}
>
  <Ionicons
    name="leaf"
    size={24}
    color={Colors.forest}
    style={{ marginRight: 8 }}
  />

  <Text style={styles.infoTitle}>
    Personalized Nutrition
  </Text>
</View>

  <Text style={styles.subtitle}>
    Your AI recommendations are personalized based on your health conditions, dietary preferences, and goals.
  </Text>
</View>

        <Text style={styles.sectionTitle}>
  Health Conditions
</Text>

<View style={styles.chipContainer}>

  {HEALTH_CONDITIONS.map((condition) => {
  const isSelected = selectedConditions.includes(condition.name);

  return (
    <Pressable
      key={condition.name}
      style={[
        styles.chip,
        isSelected && styles.selectedChip,
      ]}
      onPress={() => {
        if (isSelected) {
          setSelectedConditions(
            selectedConditions.filter(
              item => item !== condition.name
            )
          );
        } else {
          setSelectedConditions([
            ...selectedConditions,
            condition.name,
          ]);
        }
      }}
    >
      <View
  style={{
    flexDirection: "row",
    alignItems: "center",
  }}
>
  {isSelected && (
    <Ionicons
      name="checkmark-circle"
      size={20}
      color="white"
      style={{ marginRight: 8 }}
    />
  )}

  <Ionicons
    name={condition.icon as any}
    size={20}
    color={isSelected ? "white" : condition.color}
    style={{ marginRight: 10 }}
  />

  <Text
    style={[
      styles.chipText,
      isSelected && styles.selectedChipText,
    ]}
  >
    {condition.name}
  </Text>
</View>
    </Pressable>
  );
})}
</View>

<Text style={styles.sectionTitle}>
  Dietary Preferences
</Text>

<View style={styles.chipContainer}>
  {DIETARY_PREFERENCES.map((preference) => {
    const isSelected =
      selectedDietaryPreferences.includes(preference.name);

    return (
      <Pressable
        key={preference.name}
        style={[
          styles.chip,
          isSelected && styles.selectedChip,
        ]}
        onPress={() => {
          if (isSelected) {
            setSelectedDietaryPreferences(
              selectedDietaryPreferences.filter(
                item => item !== preference.name
              )
            );
          } else {
            setSelectedDietaryPreferences([
              ...selectedDietaryPreferences,
              preference.name,
            ]);
          }
        }}
      >
        <View
  style={{
    flexDirection: "row",
    alignItems: "center",
  }}
>
  {isSelected && (
    <Ionicons
      name="checkmark-circle"
      size={20}
      color="white"
      style={{ marginRight: 8 }}
    />
  )}

  <Ionicons
    name={preference.icon as any}
    size={20}
    color={isSelected ? "white" : preference.color}
    style={{ marginRight: 10 }}
  />

  <Text
    style={[
      styles.chipText,
      isSelected && styles.selectedChipText,
    ]}
  >
    {preference.name}
  </Text>
</View>
      </Pressable>
    );
  })}
</View>

<Text style={styles.sectionTitle}>
  Health Goal
</Text>

<View style={styles.chipContainer}>
  {HEALTH_GOALS.map((goal) => {
    const isSelected =
      selectedHealthGoal === goal.name;

    return (
      <Pressable
        key={goal.name}
        style={[
          styles.chip,
          isSelected && styles.selectedChip,
        ]}
        onPress={() =>
          setSelectedHealthGoal(goal.name)
        }
      >
        <View
  style={{
    flexDirection: "row",
    alignItems: "center",
  }}
>
  {isSelected && (
    <Ionicons
      name="checkmark-circle"
      size={20}
      color="white"
      style={{ marginRight: 8 }}
    />
  )}

  <Ionicons
    name={goal.icon as any}
    size={20}
    color={isSelected ? "white" : goal.color}
    style={{ marginRight: 10 }}
  />

  <Text
    style={[
      styles.chipText,
      isSelected && styles.selectedChipText,
    ]}
  >
    {goal.name}
  </Text>
</View>
      </Pressable>
    );
  })}
</View>

      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },


subtitle: {
  fontSize: 17,
  fontWeight: "500",
  color: Colors.forest,
  textAlign: "left",
  lineHeight: 28,
},

  sectionTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: Colors.forest,
  marginTop: 18,
  marginBottom: 13,
},

chipContainer: {
  marginTop: 5,
},

chip: {
  width: "100%",
  backgroundColor: "rgba(255,255,255,0.9)",
  borderRadius: 18,
  paddingVertical: 16,
  paddingHorizontal: 20,
  marginBottom: 12,
},

chipText: {
  fontSize: 18,
  fontWeight: "600",
  color: Colors.forest,
},

infoCard: {
  backgroundColor: "rgba(255,255,255,0.75)",
  borderRadius: 20,
  paddingVertical: 12,
  paddingHorizontal: 18,
  marginTop: -20,
  marginBottom: 18,
},

selectedChip: {
  backgroundColor: Colors.forest,
},

selectedChipText: {
  color: "white",
},

infoTitle: {
  fontSize: 20,
  fontWeight: "700",
  color: Colors.forest,
  marginBottom: 8,
  textAlign: "left",
},
});