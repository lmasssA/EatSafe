import Colors from "@/constants/colors";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AppBackground from "@/components/AppBackground";
import HealthProfileSection from "@/components/HealthProfileSection";
import { getScanHistory } from "@/utils/storage";

export default function ProfileScreen() {
  const [totalScans, setTotalScans] = useState(0);
const [healthyProducts, setHealthyProducts] = useState(0);
const [unhealthyProducts, setUnhealthyProducts] = useState(0);
useEffect(() => {
  async function loadStats() {
    const history = await getScanHistory();

    setTotalScans(history.length);

    const healthy = history.filter(
      (item: any) =>
        item.grade === "A" ||
        item.grade === "B"
    );

    const unhealthy = history.filter(
      (item: any) =>
        item.grade === "C" ||
        item.grade === "D"
    );

    setHealthyProducts(
      healthy.length
    );

    setUnhealthyProducts(
      unhealthy.length
    );
  }

  loadStats();
}, []);
  return (
    <AppBackground>
      <ScrollView
  style={styles.container}
  showsVerticalScrollIndicator={false}
>
      <Text style={styles.title}>
        My Profile
      </Text>

      <HealthProfileSection />

<View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 18,
  }}
>
  <Ionicons
    name="stats-chart"
    size={26}
    color={Colors.forest}
    style={{ marginRight: 8 }}
  />

  <Text style={styles.sectionHeading}>
    Your Activity
  </Text>
</View>

<View style={styles.statsRow}>

<View style={styles.statCard}>
  <Text style={styles.label}>
    Total Scans
  </Text>

  <Text style={styles.value}>
    {totalScans}
  </Text>
</View>

<View style={styles.statCard}>
  <Text style={styles.label}>
    Healthy Products
  </Text>

  <Text style={styles.value}>
    {healthyProducts}
  </Text>
</View>

<View style={styles.statCard}>
  <Text style={styles.label}>
    Needs Improvement
  </Text>

  <Text style={styles.value}>
    {unhealthyProducts}
  </Text>
</View>
      <View style={styles.card}>
        <Text style={styles.label}>
          About
        </Text>

        <Text style={styles.about}>
          EatSafe helps users understand whether packaged food products are healthy by analyzing barcode and nutrition information.
        </Text>
      </View>
      </View>
    </ScrollView>

    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
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
    backgroundColor: "rgba(255,255,255,0.82)",
    borderRadius: 32,
    padding: 20,
    marginBottom: 16,
  },

  statsRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},

  label: {
    fontSize: 14,
    color: Colors.ink2,
    marginBottom: 8,
  },

  value: {
  fontSize: 36,
  fontWeight: "700",
  color: Colors.forest,
  marginTop: 8,
},

  about: {
    color: Colors.ink2,
    lineHeight: 24,
  },

  sectionHeading: {
  fontSize: 26,
  fontWeight: "700",
  color: Colors.forest,
  marginTop: 30,
  marginBottom: 18,
},

statCard: {
  width: "48%",
  backgroundColor: "rgba(255,255,255,0.85)",
  borderRadius: 22,
  padding: 18,
  marginBottom: 14,
}, 
});