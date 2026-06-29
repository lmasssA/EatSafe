import Colors from "@/constants/colors";
import {
  getHealthProfile,
  saveHealthProfile,
} from "@/utils/healthStorage";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const HEALTH_CONDITIONS = [
  { emoji: "💉", name: "Diabetes" },
  { emoji: "❤️", name: "Heart Disease" },
  { emoji: "🩸", name: "High Blood Pressure" },
  { emoji: "🧪", name: "High Cholesterol" },
  { emoji: "🫘", name: "Kidney Disease" },
  { emoji: "🤰", name: "Pregnancy" },
];

const DIETARY_PREFERENCES = [
  { emoji: "🥦", name: "Vegetarian" },
  { emoji: "🌱", name: "Vegan" },
  { emoji: "🥛", name: "Lactose Intolerant" },
  { emoji: "🌾", name: "Gluten-Free" },
  { emoji: "🥜", name: "Nut Allergy" },
];

const HEALTH_GOALS = [
  { emoji: "⚖️", name: "Lose Weight" },
  { emoji: "💪", name: "Gain Muscle" },
  { emoji: "🥗", name: "Eat Healthier" },
  { emoji: "❤️", name: "Maintain Health" },
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
  <Text style={styles.infoTitle}>
    🍃 Personalized Nutrition
  </Text>

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
      <Text
        style={[
          styles.chipText,
          isSelected && styles.selectedChipText,
        ]}
      >
        {isSelected ? "✓ " : ""}
        {condition.emoji} {condition.name}
      </Text>
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
        <Text
          style={[
            styles.chipText,
            isSelected &&
              styles.selectedChipText,
          ]}
        >
          {isSelected ? "✓ " : ""}
          {preference.emoji} {preference.name}
        </Text>
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
        <Text
          style={[
            styles.chipText,
            isSelected &&
              styles.selectedChipText,
          ]}
        >
          {isSelected ? "✓ " : ""}
          {goal.emoji} {goal.name}
        </Text>
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