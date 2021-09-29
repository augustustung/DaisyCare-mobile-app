import { StyleSheet } from "react-native";
import { scaleH, scaleV, ColorConst } from "../../ultis";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConst.DEEP_GREEN
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: scaleH(16),
        paddingBottom: scaleV(16)
    },
    footer: {
        backgroundColor: '#fff',
        flex: 2,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: scaleH(16),
        paddingTop: scaleV(24)
    },
    textHeader: {
        fontSize: scaleH(30),
        color: "#fff",
        fontWeight: 'bold',
    },
    textForgot: {
        marginBottom: scaleV(24),
        color: "#23887c"
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})