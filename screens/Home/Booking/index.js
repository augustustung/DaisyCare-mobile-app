import React, { Component } from 'react';
import { connect } from "react-redux";
import ProfileDoctor from '../../../components/ProfileDoctor';
import { fetchGenderStart, updateUserInfo } from '../../../redux/actions'
import { CustomDropDownPicker } from '../../../components'
import { editUser, postBookingAppointment } from '../../../services'
import _ from 'lodash';
import moment from 'moment';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './booking.style'
import SafeContainer from '../../../components/SafeContainer';
import CustomHeader from '../../../components/CustomHeader';
import { headerLeft, scaleH, scaleV } from '../../../ultis';
import { FormInput } from '../../../components/FormInput'
import DatePicker from 'react-native-date-picker'

class BookingScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: "",
      lastName: '',
      phoneNumber: '',
      email: "",
      address: "",
      reason: '',
      birthday: "",
      gender: "",
      selectedGender: "",
      listGender: [
        { label: 'Nam', value: 'M' },
        { label: 'Nữ', value: 'F' },
        { label: "Khác", value: "O" }
      ],
      isLoading: false,
      open: false,
      openDatePicker: false
    }
  }
  async componentDidMount() {
    await this.props.fetchGender()
    const { user } = this.props

    if (user && !_.isEmpty(user)) {
      this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        address: user.address,
        birthday: user.birthday,
        selectedGender: user.gender
      })
    }
  }

  async componentDidUpdate(prevProps) {
    const { genders, user } = this.props
    if (prevProps.genders !== genders) {
      this.setState({
        listGender: this.buildDataGender(genders),
        selectedGender: user.gender
      })

    }
  }

  buildDataGender = (data) => {
    let result = []

    if (data && data.length > 0) {
      data.map(item => {
        let obj = {}
        obj.label = item.valueVi
        obj.value = item.keyMap
        result.push(obj)

        return item
      })
    }

    return result
  }

  validateInput = () => {
    const valid = [
      "firstName",
      "lastName",
      "phoneNumber",
      "email",
      "address",
      "reason",
      "birthday",
      "selectedGender"
    ]

    for (let i = 0; i < valid.length; i++) {
      if (!this.state[valid[i]]) {
        Alert.alert("Daisy Care", "Vui lòng điền thông tin")
        return false
      }
    }

    return true
  }

  handleSubmit = async () => {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      reason,
      birthday,
      selectedGender
    } = this.state

    const { dataSchedule, doctorId } = this.props.route.params

    if (!this.validateInput()) return
    this.setState({
      isLoading: true
    })

    let timeString = this.buildTimeBooking(dataSchedule)
    let doctorName = this.buildDoctorName(dataSchedule)
    const dataUser = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      address: address,
      reason: reason,
      date: dataSchedule.date,
      birthday: moment(birthday).format("DD/MM/YYYY"),
      doctorId: doctorId,
      gender: selectedGender.value,
      timeType: this?.props?.route?.params?.dataSchedule?.timeType || "T1",
      language: 'vi',
      timeString: timeString,
      doctorName: doctorName
    }
    let res = await postBookingAppointment(dataUser)
    this.props.updateUserInfo({
      ...dataUser,
      birthday: birthday
    })
    editUser({
      ...dataUser,
      birthday: birthday,
      id: this.props.user.id
    })

    if (res && res.errCode === 0) {
      Alert.alert("Daisy Care", "Quý khách vui lòng kiểm tra email để hoàn tất đặt lịch!", [{
        text: "OK",
        onPress: () => this.props.navigation.goBack(),
      }])
      this.setState({
        isLoading: false
      })
    }
    else {
      Alert.alert("Daisy Care", "Có lỗi xảy ra vui lòng thử lại sau!")
      this.setState({
        isLoading: false
      })
    }
  }

  buildTimeBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = dataTime?.timeTypeData?.valueVi || undefined
      let date = moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
      return `${time} - ${date}`
    }

    return ""
  }


  buildDoctorName = (dataName) => {
    if (dataName && !_.isEmpty(dataName)) {
      let name = `${dataName.doctorData.lastName} ${dataName.doctorData.firstName}`
      return name
    }
    return ''
  }

  setOpen = (open) => {
    this.setState({
      open
    });
  }

  setValue = (callback) => {
    this.setState(state => ({
      selectedGender: callback(state.selectedGender)
    }));
  }

  setListItem = (callback) => {
    this.setState(state => ({
      listGender: callback(state.listGender)
    }));
  }

  render() {
    const { navigation } = this.props
    const { doctorId, dataSchedule } = this.props.route.params
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      reason,
      birthday,
      listGender,
      selectedGender,
      open,
      openDatePicker
    } = this.state

    return (
      <SafeContainer>
        <ScrollView>
          <CustomHeader headerLeft={() => headerLeft({ navigation: navigation, routeName: 'Đặt lịch khám' })} />

          <View>
            <View>
              <View style={styles.doctorInfo}>
                <ProfileDoctor
                  doctorId={doctorId}
                  isShowDoctorDescription={false}
                  dataTime={dataSchedule}
                  isShowLink={false}
                  isShowPrice={true}
                />
              </View>
              <View style={styles.info}>
                <FormInput
                  uri="user-o"
                  value={lastName}
                  setValue={(text) => this.setState({ lastName: text })}
                  placeholder="Họ"
                  marginBottom={scaleV(12)}
                />

                <FormInput
                  uri="user-o"
                  value={firstName}
                  setValue={(text) => this.setState({ firstName: text })}
                  placeholder="Tên"
                  marginBottom={scaleV(12)}
                />

                <FormInput
                  uri="phone"
                  placeholder="Số điện thoại"
                  value={phoneNumber}
                  marginBottom={scaleV(16)}
                  keyboardType="numeric"
                  setValue={(text) => this.setState({ phoneNumber: text })}
                />

                <FormInput
                  uri="user-o"
                  placeholder="Email"
                  value={email}
                  marginBottom={scaleV(16)}
                  keyboardType='email-address'
                  setValue={(text) => this.setState(prev => ({ ...prev, email: text }))}
                />

                <FormInput
                  uri="home"
                  placeholder="Địa chỉ"
                  value={address}
                  marginBottom={scaleV(16)}
                  setValue={(text) => this.setState(prev => ({ ...prev, address: text }))}
                />

                <View style={{ marginHorizontal: scaleH(16) }}>
                  <CustomDropDownPicker
                    placeholder="Chọn giới tính: "
                    open={open}
                    selectedValue={selectedGender}
                    listItems={listGender}
                    setOpen={this.setOpen}
                    setSelectedValue={this.setValue}
                    setItems={this.setListItem}
                    disableSearch
                  />
                </View>

                <FormInput
                  uri="calendar"
                  placeholder="Ngày sinh"
                  value={moment(birthday).format("DD/MM/YYYY")}
                  marginBottom={scaleV(16)}
                  onFocus={() => this.setState({ openDatePicker: true })}
                  setValue={() => { }}
                />

                <DatePicker
                  modal mode="date"
                  open={openDatePicker}
                  date={birthday ? new Date(birthday) : new Date()}
                  onConfirm={(date) => {
                    this.setState({
                      openDatePicker: false,
                      birthday: date
                    })
                  }}
                  onCancel={() => {
                    this.setState({
                      openDatePicker: false
                    })
                  }}
                />

                <FormInput
                  uri="question-circle"
                  placeholder="Lý do khám"
                  value={reason}
                  marginBottom={scaleV(16)}
                  setValue={(text) => this.setState(prev => ({ ...prev, reason: text }))}
                />
              </View>
            </View>

            <View style={styles.bookingModalFooter}>
              <TouchableOpacity style={styles.btnConfirm} onPress={this.handleSubmit}><Text>Đặt lịch</Text></TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ padding: 10 }}>
                <Text>Huỷ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    genders: state.app.genders,
    user: state.user.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGender: () => dispatch(fetchGenderStart()),
    updateUserInfo: (data) => dispatch(updateUserInfo(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);