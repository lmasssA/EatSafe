import AppBackground from "@/components/AppBackground";
import Colors from "@/constants/colors";
import { Stack } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HealthProfileScreen() {
  return (
    <AppBackground>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          🌿 Your Health Profile
        </Text>
<View style={styles.infoCard}>
        <Text style={styles.subtitle}>
          Select your health conditions to receive personalized nutrition insights and smarter food recommendations.
        </Text>
</View>

        <Text style={styles.sectionTitle}>
  Health Conditions
</Text>

<View style={styles.chipContainer}>

  <View style={styles.chip}>
    <Text style={styles.chipText}>💉 Diabetes</Text>
  </View>

  <View style={styles.chip}>
    <Text style={styles.chipText}>❤️ Heart Disease</Text>
  </View>

  <View style={styles.chip}>
    <Text style={styles.chipText}>🩸 High Blood Pressure</Text>
  </View>

  <View style={styles.chip}>
    <Text style={styles.chipText}>🧪 High Cholesterol</Text>
  </View>

  <View style={styles.chip}>
    <Text style={styles.chipText}>🫘 Kidney Disease</Text>
  </View>

  <View style={styles.chip}>
    <Text style={styles.chipText}>🤰 Pregnancy</Text>
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

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.forest,
    textAlign: "center",
    marginTop: 60,
  },

subtitle: {
  fontSize: 17,
  fontWeight: "600",
  color: Colors.forest,
  textAlign: "center",
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
  marginTop: 20,
  marginBottom: 18,
},
});