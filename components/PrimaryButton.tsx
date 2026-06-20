import Colors from "@/constants/colors";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export default function PrimaryButton({ title, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.forest,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 30,
  },

  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
});