import { scaleV, scaleH } from "../../../ultis";
const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  doctorDetailContainer: {
    paddingHorizontal: scaleV(16)
  },
  introDoctor: {
    display: "flex",
    flexDirection: 'row'
  },
  contentLeft: {
    width: scaleH(100),
    height: scaleH(100),
    resizeMode: "cover",
    borderRadius: 50
  },
  contentRight: {
    paddingLeft: scaleH(16),
    paddingTop: scaleV(30),
    flexDirection: 'row'
  },
  detailDoctor: {
    paddingVertical: scaleV(16)
  },
  moreInfo: {
    marginTop: scaleV(16),
    paddingTop: scaleV(16),
    borderTopWidth: 1,
    borderTopColor: "#ccc"
  }
})

export default styles