import { ImageBackground, StyleSheet } from "react-native";

export default function AppBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ImageBackground
      source={require("../assets/images/apple-bg.png")}
      style={styles.background}
      resizeMode="cover"
      imageStyle={styles.image}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  image: {
    opacity: 7,
  },
});