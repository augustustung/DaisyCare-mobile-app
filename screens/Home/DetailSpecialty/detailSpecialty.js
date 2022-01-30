import { StyleSheet } from "react-native";
import { scaleV, scaleH } from "../../../ultis";

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
  },
  imageBgMask: {
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
    opacity: 0.7,
    padding: scaleH(16),
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    height: 3,
    marginBottom: scaleV(16)
  },
  eachDoctor: {
    display: "flex",
    width: "100%",
    marginVertical: scaleV(16),
    padding: scaleH(10),
    backgroundColor: "#fff",
    borderRadius: 8
  },
  dtContentLeft: {
    width: "50%",
    borderRightWidth: 1,
    borderRightColor: "#ddd"
  },
  dtContentRight: {
    width: "100%",
    padding: scaleH(10)
  },
  doctorExtraInfo: {
    borderTopWidth: 1,
    borderTopColor: "#808080",
    marginTop: scaleV(10),
    paddingTop: scaleV(10)
  }
})

export default styles