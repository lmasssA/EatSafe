import AppBackground from "@/components/AppBackground";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import PrimaryButton from "@/components/PrimaryButton";
import Colors from "@/constants/colors";

export default function HomeScreen() {
  return (
    <AppBackground>
    <View style={styles.container}>

      <Text style={styles.logo}>🍃</Text>

      <Text style={styles.title}>EatSafe ✦</Text>

      <Text style={styles.subtitle}>
        Your AI Food Safety Companion
      </Text>

      <PrimaryButton
        title="Scan Product"
        onPress={() => router.push("/(tabs)/scan")}
      />

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Quick Actions
        </Text>

        <Text style={styles.item}>
          📷 Scan any packaged food
        </Text>

        <Text style={styles.item}>
          🧪 Decode ingredients
        </Text>

        <Text style={styles.item}>
          🤖 Ask AI about your food
        </Text>

      </View>

      <View style={styles.tip}>

        <Text style={styles.tipTitle}>
          💡 Health Tip
        </Text>

        <Text style={styles.tipText}>
          Foods with fewer ingredients are often less processed.
        </Text>

      </View>

    </View>
     </AppBackground>
  );
}

const styles = StyleSheet.create({

  container: {
  flex: 1,
  padding: 24,
},

  logo: {
    fontSize: 70,
    textAlign: "center",
    marginTop: 50,
  },

  title: {
    fontSize: 36,
    textAlign: "center",
    fontWeight: "700",
    color: Colors.forest,
    marginTop: 10,
  },

  subtitle: {
    textAlign: "center",
    color: Colors.ink2,
    fontSize: 18,
    marginTop: 10,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.88)",
    borderRadius: 18,
    padding: 20,
    marginTop: 35,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.forest,
    marginBottom: 15,
  },

  item: {
    fontSize: 16,
    marginBottom: 12,
    color: Colors.ink2,
  },

  tip: {
    backgroundColor: "rgba(255,255,255,0.88)",
    borderRadius: 18,
    padding: 20,
    marginTop: 25,
  },

  tipTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.forest,
  },

  tipText: {
    marginTop: 10,
    fontSize: 15,
    color: Colors.ink2,
  },

});