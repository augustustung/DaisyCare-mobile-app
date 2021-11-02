import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT } from "../../../ultis";

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    maxHeight: SCREEN_HEIGHT/3,
    position: 'relative'
  },
  imageBgMask: {
    position: 'absolute',
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
    opacity: 0.7,
    overflow: "hidden"
  }
})

export default styles