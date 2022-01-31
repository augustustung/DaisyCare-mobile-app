import { StyleSheet } from "react-native";
import { ColorConst, scaleH, scaleV } from "../../../ultis";

const styles = StyleSheet.create({
  doctorInfo: {
    paddingHorizontal: scaleH(16)
  },
  info: {
    marginTop: scaleV(12)
  },
  bookingModalFooter: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: scaleH(16)
  },
  btnConfirm: {
    backgroundColor: ColorConst.PRIMARY_YELLOW,
    padding: 10,
    borderRadius: 5,
    marginRight: 25
  }
})

export default styles
