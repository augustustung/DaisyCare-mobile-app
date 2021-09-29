import { StyleSheet } from "react-native";
import { scaleV, scaleH, ColorConst } from '../../../../ultis'

export const styles = StyleSheet.create({
    sectionContainer: {
        marginHorizontal: scaleH(16),
        marginTop: scaleV(30)
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    sectionTitle: {
        fontSize: scaleH(18),
        lineHeight: scaleV(21.5),
        fontWeight: '500',
        letterSpacing: 0.5
    },
    btnTitle: {
        color: ColorConst.DEEP_GREEN,
        fontSize: scaleH(16),
        letterSpacing: 0.5,
        fontWeight: '700',
        lineHeight: scaleV(21.5)
    },
    sectionFooter: {
        paddingTop: scaleV(16),
        backgroundColor: "#eee"
    },
    sectionCard: {
        height: scaleV(170),
        paddingRight: scaleH(16),
        width: scaleH(220)
    },
    cardImg: {
        height: scaleV(130),
        borderRadius: 5,
        resizeMode: 'cover'
    },
    cardTitle: {
        paddingTop: scaleV(5),
        fontSize: scaleH(16),
        lineHeight: scaleV(21.5),
        letterSpacing: 0.5,
        textAlign: 'left',
        overflow: 'hidden',
        fontWeight: '500'
    },
    avartar: {
        width: scaleH(100),
        height: scaleH(100),
        borderRadius: 70,
        alignSelf: 'center'
    },
    doctorName: {
        fontSize: scaleH(16),
        fontWeight: "700",
        marginTop: scaleV(8),
        textAlign: 'center'
    },
    doctorMajor: {
        marginTop: scaleV(5),
        fontSize: scaleH(16),
        fontStyle: 'italic',
        textAlign: 'center'
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scaleV(8)
    },
    social: {
        fontSize: scaleH(16),
        lineHeight: scaleV(16),
        marginLeft: scaleH(6),
        letterSpacing: 0.5
    },
    footerContainer: {
        alignItems: 'center',
        marginTop: scaleV(20)
    },
    copyright: {
        fontSize: scaleH(16),
        letterSpacing: 0.5,
        lineHeight: scaleV(21.5),
        marginBottom: scaleV(10)
    }
})