import React, { useState } from 'react'
import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './style.login'
import * as Animatable from 'react-native-animatable'
import Feather from "react-native-vector-icons/Feather"
import { handleRegister } from '../../services/userService'
import { loginSuccess } from '../../redux/actions'
import Toast from 'react-native-toast-message';
import { FormButton, FormInput, CustomDropDownPicker } from '../../components'
import { ColorConst, scaleH, scaleV } from '../../ultis'
import { useDispatch } from 'react-redux'
import moment from 'moment';

function RegisterScreen({
    navigation
}) {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        fullName: '',
        phoneNumber: '',
        address: ''
    })
    const dispatch = useDispatch()
    const [gender, setGender] = useState(null)
    const [sercurityEntry, setSercurityEntry] = useState(true)
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState([
        { label: 'Nam', value: 'M' },
        { label: 'Nữ', value: 'F' },
        { label: "Khác", value: "O" }
    ])
    const [loading, setLoading] = useState(false)

    const {
        email,
        password,
        fullName,
        phoneNumber,
        address
    } = userInfo

    const validateInfo = () => {
        const validate = ["email", "password", "fullName", "phoneNumber", "address"]
        for (let i = 0; i < validate.length; i++)
            if (!userInfo[validate[i]]) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Lỗi',
                    text2: "Vui lòng nhập vào thông tin",
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                })
                return false
            }

        return true
    }

    const _onRegister = async () => {
        const validate = validateInfo()
        if (!validate)
            return
        setLoading(true)
        let firstName = ''
        let lastName = ''
        const arrName = fullName.split(" ")
        if (arrName.length > 2) {
            firstName = arrName[0]
            lastName = arrName.filter(item => item !== firstName).join(' ')
        } else {
            firstName = arrName[0]
            lastName = arrName[1] || '   '
        }

        const res = await handleRegister({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            birthday: moment(new Date()).format("DD/MM/YYYY"),
            address: address,
            gender: gender
        })

        if (res && res.errCode === 0) {
            setLoading(false)
            dispatch(loginSuccess({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                address: address,
                birthday: new Date(),
                gender: gender
            }))
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Đăng ký thành công!',
                text2: 'Chào mừng đến với Daisy Care 👋',
                autoHide: true,
            })
        } else if (res.errCode === 2) {
            setLoading(false)
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Email đã được sử dụng!',
                text2: '',
                autoHide: true,
            })
        } else {
            setLoading(false)
            Toast.show({
                type: "error",
                position: 'top',
                text1: "Có lỗi xảy ra. Vui lòng thử lại",
                autoHide: true,
            })
        }
    }

    if (loading) {
        return (
            <ProgressLoader
                visible={loading}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"} />
        )
    }

    return (
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container} >
                <View style={styles.header}>
                    <Animatable.Text
                        style={styles.textHeader}
                        animation="bounceIn"
                        duration={2000}
                    >
                        Đăng ký
                    </Animatable.Text>
                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    duration={2000}
                    style={[styles.footer, { flex: 3 }]}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >
                        <FormInput
                            uri="user-o"
                            placeholder="Email"
                            value={email}
                            marginBottom={scaleV(16)}
                            keyboardType='email-address'
                            setValue={(text) => setUserInfo(prev => ({ ...prev, email: text }))}
                        />

                        <View style={styles.wrapper}>
                            <FormInput
                                value={password}
                                setValue={(text) => setUserInfo(prev => ({ ...prev, password: text }))}
                                uri="lock"
                                marginBottom={scaleV(16)}
                                secureTextEntry={sercurityEntry}
                                placeholder="Mật khẩu"
                            />

                            <Feather
                                name={sercurityEntry ? "eye" : "eye-off"}
                                color="grey"
                                size={scaleH(24)}
                                style={{ alignSelf: 'flex-end', zIndex: 2, marginBottom: scaleV(16) }}
                                onPress={() => setSercurityEntry(!sercurityEntry)}
                            />
                        </View>
                        <FormInput
                            uri="user-o"
                            marginBottom={scaleV(16)}
                            placeholder="Họ tên"
                            value={fullName}
                            setValue={(text) => setUserInfo(prev => ({ ...prev, fullName: text }))}
                        />

                        <FormInput
                            uri="home"
                            placeholder="Địa chỉ"
                            value={address}
                            marginBottom={scaleV(16)}
                            setValue={(text) => setUserInfo(prev => ({ ...prev, address: text }))}
                        />

                        <FormInput
                            uri="phone"
                            placeholder="Số điện thoại"
                            value={phoneNumber}
                            marginBottom={scaleV(16)}
                            keyboardType="numeric"
                            setValue={(text) => setUserInfo(prev => ({ ...prev, phoneNumber: text }))}
                        />

                        <CustomDropDownPicker
                            placeholder="Chọn giới tính: "
                            open={open}
                            disableSearch
                            selectedValue={gender}
                            listItems={items}
                            setOpen={setOpen}
                            setSelectedValue={setGender}
                            setItems={setItems}
                        />
                    </KeyboardAvoidingView>

                    <FormButton
                        title="Đăng ký"
                        onPress={_onRegister}
                        marginBottom={scaleV(16)}
                    />

                    <Text style={
                        [styles.textForgot,
                        {
                            textAlign: 'center',
                            color: ColorConst.NEUTRAL_GREY
                        }]}
                    >
                        Đã có tài khoản?{" "}
                        <Text
                            style={styles.textForgot}
                            onPress={navigation.goBack}
                        >
                            Đăng nhập
                        </Text>
                    </Text>
                </Animatable.View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}


export default RegisterScreen

