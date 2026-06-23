import axios from "axios";

export async function getProductByBarcode(barcode: string) {
  try {
    const response = await axios.get(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`,
      {
        headers: {
  "User-Agent":
    "EatSafe - Educational Project - Contact: eatsafe.app@gmail.com",
},
      }
    );

    console.log("API RESPONSE:", response.data);

    return response.data;
  } catch (error) {
    console.log("Open Food Facts Error:", error);
    return null;
  }
}