import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './style.login'
import * as Animatable from 'react-native-animatable'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import { handleLogin } from '../../services/userService'
import { connect } from "react-redux"
import * as actions from '../../redux/actions'
import { ColorConst, REGEX } from '../../ultis/Constant'
import { FormInput, FormButton } from '../../components'
import { ErrorText, scaleH, scaleV } from '../../ultis'

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sercurityEntry: true,
            email: "",
            password: '',
            err: '',
            borderEmailColor: null,
            borderPasswordColor: null
        }
    }

    validate = () => {
        if (!this.state.email) {
            this.setState({
                err: "Vui lòng nhập địa chỉ Email!",
                borderEmailColor: ColorConst.PRIMARY_RED
            })
            return false
        }
        if (!REGEX.test(String(this.state.email).toLocaleLowerCase())) {
            this.setState({
                err: "Địa chỉ email không hợp lệ!",
                borderEmailColor: ColorConst.PRIMARY_RED
            })
            return false
        }
        if (!this.state.password) {
            this.setState({
                err: "Vui lòng nhập vào mật khẩu!",
                borderPasswordColor: ColorConst.PRIMARY_RED
            })
            return false
        }
        return true
    }

    _onSignIn = async () => {
        const { email, password } = this.state

        this.setState({
            err: '',
            borderEmailColor: null,
            borderPasswordColor: null
        })

        const isValid = this.validate()
        if (!isValid)
            return;

        else {
            this.props.processAction()

            const res = await handleLogin(email, password)

            if (res && res.errCode === 0)
                this.props.loginSuccess(res.user)
            else {
                if (res.errCode === 3)
                    this.setState({
                        borderPasswordColor: ColorConst.PRIMARY_RED,
                        err: res.errMessage
                    })
                else if (res.errCode === 1)
                    this.setState({
                        borderEmailColor: ColorConst.PRIMARY_RED,
                        err: res.errMessage
                    })
                else
                    this.setState({ err: res.message })

                this.props.processActionFailed()
            }
        }
    }

    render() {
        const {
            sercurityEntry,
            email,
            password,
            err,
            borderEmailColor,
            borderPasswordColor
        } = this.state

        return (
            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Animatable.Text
                            style={styles.textHeader}
                            animation="bounceIn"
                            duration={2000}
                        >
                            Daisy Care
                        </Animatable.Text>
                    </View>
                    <Animatable.View
                        style={styles.footer}
                        animation="fadeInUpBig"
                        duration={2000}
                    >
                        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                            <FormInput
                                title="Email"
                                uri="user-o"
                                value={email}
                                borderColor={borderEmailColor}
                                setValue={(text) => this.setState({ email: text })}
                                keyboardType='email-address'
                                placeholder="Email"
                                marginBottom={scaleV(12)}
                            />

                            <View style={styles.wrapper}>
                                <FormInput
                                    title="Password"
                                    value={password}
                                    setValue={(text) => this.setState({ password: text })}
                                    uri="lock"
                                    secureTextEntry={sercurityEntry}
                                    placeholder="Mật khẩu"
                                    borderColor={borderPasswordColor}
                                    onSubmitEditing={this._onSignIn}
                                />

                                <Feather
                                    name={sercurityEntry ? "eye" : "eye-off"}
                                    color="grey"
                                    size={scaleH(24)}
                                    style={{ alignSelf: 'flex-end', zIndex: 2 }}
                                    onPress={() => this.setState({ sercurityEntry: !sercurityEntry })}
                                />
                            </View>
                        </KeyboardAvoidingView>

                        {ErrorText(err)}

                        <Text style={styles.textForgot}>Quên mật khẩu</Text>

                        <FormButton
                            title="Đăng nhập"
                            onPress={this._onSignIn}
                            marginBottom={scaleV(16)}
                        />

                        <FormButton
                            title="Đăng ký"
                            onPress={() => this.props.navigation.navigate("Register")}
                            titleColor={ColorConst.LIGHT_GREEN}
                            borderColor={ColorConst.LIGHT_GREEN}
                            backgroundColor="#fff"
                        />
                    </Animatable.View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        app: state.appReducer
    };
};

const mapDispatchToProps = dispatch => ({
    loginSuccess: (userInfo) => dispatch(actions.loginSuccess(userInfo)),
    processAction: () => dispatch(actions.processAction()),
    processActionFailed: () => dispatch(actions.processActionFailed())
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
