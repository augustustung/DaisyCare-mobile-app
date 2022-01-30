import React, { Component } from 'react';
import { connect } from "react-redux";
import ProfileDoctor from '../../../components/ProfileDoctor';
import { fetchGenderStart } from '../../../redux/actions'
import CustomDropdownPicker from '../../../components/CustomDropDownPicker'
import { postBookingAppointment } from '../../../services'
import _ from 'lodash';
import moment from 'moment';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './booking.style'
import SafeContainer from '../../../components/SafeContainer';
import CustomHeader from '../../../components/CustomHeader';
import { headerLeft } from '../../../ultis';

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
      timeType: '',
      listGender: [],
      isLoading: false
    }
  }

  async componentDidMount() {
    await this.props.fetchGender()
    const { user, genders } = this.props

    if (user && !_.isEmpty(user)) {
      this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        address: user.address,
        birthday: user.birthday,
        selectedGender: this.buildFirstGenderSelect(genders)
      })
    }
  }

  async componentDidUpdate(prevProps) {
    const { genders, dataSchedule } = this.props
    if (prevProps.genders !== genders) {
      this.setState({
        listGender: this.buildDataGender(genders),
        timeType: dataSchedule?.timeType || undefined,
        selectedGender: this.buildFirstGenderSelect(genders)
      })

    }
  }

  buildFirstGenderSelect = (genders) => {
    let result = {}
    for (let i = 0; i < genders.length; i++) {
      if (genders[i].keyMap === this.props.user.gender) {
        result.value = genders[i].keyMap;
        result.label = genders[i].valueVi
        break
      }
    }

    return result
  }

  onChangeText = (e) => {
    const { value, name } = e.target
    let copyState = this.state
    copyState[name] = value
    this.setState({ ...copyState })
  }

  handleChangeDayPicker = (date) => {
    this.setState({ birthday: date[0] })
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

  handleChangeSelect = async (selectedGender) => {
    this.setState({ selectedGender })
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
      "selectedGender",
      "timeType",
    ]

    for (let i = 0; i < valid.length; i++) {
      if (!this.state[valid[i]]) {
        Alert.alert("Vui lòng điền thông tin")
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
      selectedGender,
      timeType
    } = this.state

    const { dataSchedule } = this.props

    if (!this.validateInput()) return
    this.setState({
      isLoading: true
    })

    let formattedDate = new Date(birthday).getTime()
    let timeString = this.buildTimeBooking(dataSchedule)
    let doctorName = this.buildDoctorName(dataSchedule)

    let res = await postBookingAppointment({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      address: address,
      reason: reason,
      date: dataSchedule.date,
      birthday: formattedDate,
      doctorId: this.props.doctorId,
      gender: selectedGender.value,
      timeType: timeType,
      language: 'vi',
      timeString: timeString,
      doctorName: doctorName
    })

    if (res && res.errCode === 0) {
      Alert.alert("Quý khách vui lòng kiểm tra email để hoàn tất đặt lịch!")
      this.setState({
        isLoading: false
      })
    }
    else {
      Alert.alert("Có lỗi xảy ra vui lòng thử lại sau!")
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
      isLoading
    } = this.state

    return (
      <SafeContainer>
        <ScrollView>
          <CustomHeader headerLeft={() => headerLeft({ navigation: navigation, routeName: 'Đặt lịch khám' })} />

          <View style={styles.bookingModalContent}>
            <View style={styles.bookingModalHeader}>
              <Text style={styles.left}>Đặt lịch khám</Text>
            </View>

            <View className="booking-modal-body container">
              <View className="doctor-info">
                <ProfileDoctor
                  doctorId={doctorId}
                  isShowDoctorDescription={false}
                  dataTime={dataSchedule}
                  isShowLink={false}
                  isShowPrice={true}
                />
              </View>
              {/* 
                            <View className='row'>
                                <View className="col-6 form-group">
                                    <Text>
                                        <FormattedMessage id="manage-user.last-name" />
                                    </Text>
                                    <input
                                        className="form-control"
                                        name="lastName"
                                        value={lastName}
                                        onChange={this.onChangeText}
                                    />
                                </View>

                                <View className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="manage-user.first-name" />
                                    </label>
                                    <input
                                        className="form-control"
                                        name="firstName"
                                        value={firstName}
                                        onChange={this.onChangeText}
                                    />
                                </View>

                                <View className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="manage-user.phone-number" />
                                    </label>
                                    <input
                                        className="form-control"
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={this.onChangeText}
                                    />
                                </View>

                                <View className="col-6 form-group">
                                    <label>Email</label>
                                    <input
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={this.onChangeText}
                                    />
                                </View>

                                <View className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="manage-user.address" />
                                    </label>
                                    <input
                                        className="form-control"
                                        name="address"
                                        value={address}
                                        onChange={this.onChangeText}
                                    />
                                </View>

                                <View className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="manage-user.gender" />
                                    </label>
                                    <Select
                                        value={selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={listGender}
                                    />
                                </View>

                                <View className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="manage-user.birthday" />
                                    </label>
                                    <input
                                        className="form-control"
                                        name="birthday"
                                        value={birthday}
                                        onChange={this.onChangeText}
                                    />
                                </View>

                                <View className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="manage-user.reason" />
                                    </label>
                                    <input
                                        className="form-control"
                                        name="reason"
                                        value={reason}
                                        onChange={this.onChangeText}
                                    />
                                </View>
                            </View> */}
            </View>

            <View className="booking-modal-footer">
              <TouchableOpacity className="btn-confirm" onClick={this.handleSubmit}><Text>Đặt lịch</Text></TouchableOpacity>

              <TouchableOpacity className="btn-cancel">
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
    fetchGender: () => dispatch(fetchGenderStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);