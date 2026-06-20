import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_KEY = "EATSAFE_HISTORY";

export async function saveScan(scan: any) {
  try {
    const existing = await getScanHistory();

    const updated = [scan, ...existing];

    await AsyncStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(updated)
    );
  } catch (error) {
    console.log("Save Scan Error:", error);
  }
}

export async function getScanHistory() {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Get History Error:", error);
    return [];
  }
}

export async function clearHistory() {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.log("Clear History Error:", error);
  }
}