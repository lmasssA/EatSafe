import AsyncStorage from "@react-native-async-storage/async-storage";

const CURRENT_PRODUCT_KEY = "CURRENT_PRODUCT";

export async function saveCurrentProduct(product: any) {
  try {
    await AsyncStorage.setItem(
      CURRENT_PRODUCT_KEY,
      JSON.stringify(product)
    );
  } catch (error) {
    console.log("Save Current Product Error:", error);
  }
}

export async function getCurrentProduct() {
  try {
    const product = await AsyncStorage.getItem(
      CURRENT_PRODUCT_KEY
    );

    if (!product) return null;

    return JSON.parse(product);
  } catch (error) {
    console.log("Get Current Product Error:", error);
    return null;
  }
}

export async function clearCurrentProduct() {
  try {
    await AsyncStorage.removeItem(
      CURRENT_PRODUCT_KEY
    );
  } catch (error) {
    console.log("Clear Current Product Error:", error);
  }
}