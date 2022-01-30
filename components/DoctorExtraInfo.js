import React, { Component } from 'react';
import { getExtraInfoDoctorById } from '../services/userService'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { currencyFormat } from '../ultis';

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewDetail: false,
      extraInfo: {}
    }
  }

  async componentDidMount() {
    const { doctorIdFromParent } = this.props
    if (doctorIdFromParent) {
      let res = await getExtraInfoDoctorById(doctorIdFromParent)
      if (res && res.errCode === 0) {
        this.setState({ extraInfo: res.data })
      }
    }
  }

  async componentDidUpdate(prevProps) {
    const { doctorIdFromParent } = this.props
    if (prevProps.doctorIdFromParent !== doctorIdFromParent) {
      let res = await getExtraInfoDoctorById(doctorIdFromParent)
      if (res && res.errCode === 0) {
        this.setState({ extraInfo: res.data })
      }
    }
  }

  showInfo = () => {
    const { viewDetail } = this.state

    this.setState({ viewDetail: !viewDetail })
  }

  render() {
    const { viewDetail, extraInfo } = this.state

    let priceVi = '',
      provinceVi = '',
      paymentVi = ''
    if (extraInfo && extraInfo.priceData) {
      priceVi = extraInfo.priceData.valueVi
    }

    if (extraInfo && extraInfo.provinceData) {
      provinceVi = extraInfo.provinceData.valueVi
    }

    if (extraInfo && extraInfo.paymentData) {
      paymentVi = extraInfo.paymentData.valueVi
    }

    return (
      <View style={styles.doctorExtraInfoContainer}>
        <View style={styles.contentUp}>
          <Text className="text-title">Địa chỉ phòng khám</Text>
          <Text style={styles.nameClinic}>{extraInfo.nameClinic}</Text>
          <Text style={styles.detailAddress}>{extraInfo.addressClinicId} - {provinceVi}</Text>
        </View>

        <View style={styles.contentDown}>
          {!viewDetail ?
            (
              <View className="btn-show">
                <Text>Giá khám:
                  {" "}
                  <Text style={styles.price}>
                    {currencyFormat(priceVi || 0)}
                  </Text>
                  {"     "}
                </Text>
                <Text onPress={this.showInfo}>Xem chi tiết</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.textTitle}>Giá khám</Text>
                <View style={styles.line} />
                <View style={styles.priceDetail}>
                  <Text style={styles.left}>Giá khám</Text>
                  <Text style={styles.right}>
                    {currencyFormat(priceVi || 0)}
                  </Text>
                  <Text style={styles.note}>{extraInfo.note}</Text>
                </View>


                <Text style={styles.payment}>
                  Phương thức thanh toán: {" "}{paymentVi}
                </Text>

                <TouchableOpacity onPress={this.showInfo} style={styles.btnShow}>
                  <Text>Ẩn bớt</Text>
                </TouchableOpacity>
              </View>
            )
          }
        </View>
      </View>
    );
  }
}

export default DoctorExtraInfo;

const styles = StyleSheet.create({
  doctorExtraInfoContainer: {
    paddingLeft: 15
  },
  textTitle: {
    textTransform: "uppercase",
    marginBottom: 10,
  },
  btnShow: {
    color: "#23887c",
    marginTop: 10
  },
  contentUp: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    color: "#333",
    marginBottom: 10
  },
  nameClinic: {
    fontWeight: "600",
    paddingVertical: 5,
  },
  detailAddress: {
    fontWeight: "600",
    paddingBottom: 5
  },
  priceDetail: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    backgroundColor: "#f8f8f8"

  },
  right: {
    paddingTop: 5,
  },
  payment: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    backgroundColor: "#eee"
  }
})