import Colors from "@/constants/colors";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
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
    style={styles.container}>
      showsVerticalScrollIndicator={false}

      <Text style={styles.title}>
        My Profile
      </Text>

      <HealthProfileSection />

      <View style={styles.card}>
        <Text style={styles.label}>
          App Name
        </Text>

        <Text style={styles.value}>
          EatSafe 🍃
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Version
        </Text>

        <Text style={styles.value}>
          1.0
        </Text>
      </View>
<View style={styles.card}>
  <Text style={styles.label}>
    Total Scans
  </Text>

  <Text style={styles.value}>
    {totalScans}
  </Text>
</View>

<View style={styles.card}>
  <Text style={styles.label}>
    Healthy Products
  </Text>

  <Text style={styles.value}>
    {healthyProducts}
  </Text>
</View>

<View style={styles.card}>
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

  label: {
    fontSize: 14,
    color: Colors.ink2,
    marginBottom: 8,
  },

  value: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.forest,
  },

  about: {
    color: Colors.ink2,
    lineHeight: 24,
  },
});