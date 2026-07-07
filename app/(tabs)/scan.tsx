import Colors from "@/constants/colors";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState("");

 function handleBarcodeScanned(result: BarcodeScanningResult) {
  if (scanned) return;

  setScanned(true);
  setBarcode(result.data);

  console.log("Barcode:", result.data);

  setTimeout(() => {
    console.log("SCANNED BARCODE:", barcode);
    router.push({
  pathname: "/result",
  params: {
    barcode: result.data,
  },
});
  }, 1000);
}
  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          EatSafe needs access to your camera.
        </Text>

        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Camera Permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
  <View style={{ flex: 1 }}>
   <CameraView
  style={StyleSheet.absoluteFillObject}
  facing="back"
  barcodeScannerSettings={{
    barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "qr"],
  }}
  onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
/>

    {scanned && (
      <View
        style={{
          position: "absolute",
          bottom: 60,
          left: 20,
          right: 20,
          backgroundColor: "white",
          padding: 20,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Barcode:
        </Text>

        <Text>{barcode}</Text>

        <Pressable
          style={styles.button}
          onPress={() => {
            setScanned(false);
            setBarcode("");
          }}
        >
          <Text style={styles.buttonText}>Scan Again</Text>
        </Pressable>
      </View>
    )}
  </View>
);
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: Colors.warmWhite,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  text: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.ink2,
    marginBottom: 20,
  },

  button: {
    backgroundColor: Colors.forest,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});