import AsyncStorage from "@react-native-async-storage/async-storage";

const HEALTH_KEY = "EATSAFE_HEALTH_PROFILE";

export interface HealthProfile {
  conditions: string[];
  dietaryPreferences: string[];
  healthGoal: string;
}

const DEFAULT_PROFILE: HealthProfile = {
  conditions: [],
  dietaryPreferences: [],
  healthGoal: "",
};

export async function saveHealthProfile(
  profile: HealthProfile
) {
  try {
    await AsyncStorage.setItem(
      HEALTH_KEY,
      JSON.stringify(profile)
    );
  } catch (error) {
    console.error("Save Health Profile Error:", error);
  }
}
export async function getHealthProfile(): Promise<HealthProfile> {
  try {
    const data = await AsyncStorage.getItem(HEALTH_KEY);

    if (!data) {
      return DEFAULT_PROFILE;
    }

    const parsed = JSON.parse(data);

    // Support old storage format (array of conditions)
    if (Array.isArray(parsed)) {
      return {
        conditions: parsed,
        dietaryPreferences: [],
        healthGoal: "",
      };
    }

    // New storage format
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
    };
  } catch (error) {
    console.error("Get Health Profile Error:", error);
    return DEFAULT_PROFILE;
  }
}