import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT } from "../../../ultis";

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
  },
  imageBgMask: {
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
    opacity: 0.7,
    padding: 12,
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    height: 3,
    marginBottom: 16
  }
})

export default styles