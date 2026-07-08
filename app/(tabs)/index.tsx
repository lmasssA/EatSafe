import AppBackground from "@/components/AppBackground";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "@/components/PrimaryButton";
import Colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <AppBackground>
       <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>

   <View
  style={{
    alignItems: "center",
    marginBottom: 16,
  }}
>
  <View
    style={{
      position: "relative",
    }}
  >
    <Text style={styles.title}>
      EatSafe
    </Text>

    <Ionicons
      name="leaf"
      size={22}
      color={Colors.forest}
      style={{
        position: "absolute",
        top: 1,
        left: 72,
        transform: [{ rotate: "-10deg" }],
      }}
    />
  </View>

  <Text style={styles.subtitle}>
    Your AI Food Safety Companion
  </Text>
</View>

      <PrimaryButton
        title="Scan Product"
        onPress={() => router.push("/(tabs)/scan")}
      />

      <View style={styles.card}>

        <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 18,
  }}
>
  <Ionicons
    name="flash"
    size={24}
    color={Colors.forest}
  />

  <Text style={styles.cardTitle}>
    Quick Actions
  </Text>
</View>

        <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  }}
>
  <Ionicons
    name="camera"
    size={22}
    color={Colors.forest}
    style={{ marginRight: 12 }}
  />

  <Text style={styles.item}>
    Scan any packaged food
  </Text>
</View>

<View style={styles.divider} />

       <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  }}
>
  <Ionicons
    name="flask"
    size={22}
    color="#43A047"
    style={{ marginRight: 12 }}
  />

  <Text style={styles.item}>
    Decode ingredients
  </Text>
</View>

<View style={styles.divider} />

        <View
  style={{
    flexDirection: "row",
    alignItems: "center",
  }}
>
  <Ionicons
    name="sparkles"
    size={22}
    color="#7E57C2"
    style={{ marginRight: 12 }}
  />

  <Text style={styles.item}>
   Get AI-powered insights
  </Text>
</View>

      </View>

      <View style={styles.tip}>

        <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  }}
>
  <Ionicons
    name="bulb"
    size={24}
    color="#F9A825"
  />

  <Text style={styles.tipTitle}>
    Health Tip
  </Text>
</View>

        <Text style={styles.tipText}>
          Foods with fewer ingredients are often less processed.
        </Text>

      </View>

    </View>
    </SafeAreaView>
     </AppBackground>
  );
}

const styles = StyleSheet.create({

  container: {
  flex: 1,
  paddingHorizontal: 24,
  paddingTop: 40,
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
  },

  item: {
    fontSize: 16,
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


divider: {
  height: 1,
  backgroundColor: "#E8ECE6",
  marginVertical: 10,
  marginLeft: 34,
},
});