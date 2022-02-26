import { StyleSheet } from "react-native";
import { ColorConst } from "../../ultis";
const styles = StyleSheet.create({
  scheduleContainer: {
    paddingHorizontal: 16 
  },
  scheduleItem: {
    paddingVertical: 12,
    borderBottomColor: '#2a2a2a25',
    borderBottomWidth: 1
  },
  text: {
    fontSize: 14,
    lineHeight: 21
  },
  cancelBtn: {
    borderColor: "#2a2a2a25",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 8,
    backgroundColor: ColorConst.PRIMARY_YELLOW
  },
  cancelBtnText: {
    textAlign: 'center',
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 21.5
  }
})

export default styles