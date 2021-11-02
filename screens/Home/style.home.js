import { StyleSheet } from "react-native";
import { scaleV, scaleH, ColorConst, SCREEN_WIDTH } from '../../ultis'

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    brandCard: {
        alignSelf: 'center',
        width: "100%",
        height: scaleV(200)
    },
    title: {
        paddingTop: scaleV(5),
        fontSize: scaleH(24),
        lineHeight: scaleV(21.5),
        letterSpacing: 0.5,
        fontWeight: '500',
        color: "#fff",
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 3 }
    },
    bg: {
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    leading: {
        paddingLeft: scaleH(24),
        color: ColorConst.DEEP_GREEN
    },
    header: {
        paddingVertical: scaleV(16),
        display: "flex",
        alignItems: 'center'
    },
    search: {
        marginTop: scaleV(24),
        width: "85%",
        height: scaleV(50),
        display: "flex",
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: ColorConst.PRIMARY_YELLOW,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: "80%",
        height: '100%',
        backgroundColor: "transparent",
        fontWeight: '400',
        marginLeft: scaleH(10),
        fontSize: scaleH(16),
        lineHeight: scaleV(21.5),
        letterSpacing: 0.5,
        borderWidth: 0
    },
    reminder: {
        width: "100%",
        display: "flex",
        marginTop: 30,
        marginHorizontal: 20,
        flexDirection: 'row'
    },
    items: {
        width: "40%",
        borderRadius: 30,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.8,
        marginRight: 10
    },
    itemTitle: {
        fontSize: 16,
        alignSelf: 'center',
        paddingHorizontal: 8,
        paddingVertical: 5,
        fontWeight: '500'
    },
// ======================================================================= //
    sectionItem: {
        marginHorizontal: scaleH(16),
        flexDirection: 'row',
        marginTop: scaleV(16),
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 1 }
    },
    sectionItemImage: {
        width: scaleH(100),
        height: scaleV(70),
        resizeMode: 'cover',
        marginRight: scaleH(16)
    },
    sectionItemTitle: {
        fontSize: scaleH(16),
        lineHeight: scaleV(21.5),
        letterSpacing: 0.5,
        width: SCREEN_WIDTH - scaleH(48) - scaleH(100),
        paddingTop: 10
    },
    sectionItemAvatar: {
        width: scaleH(80),
        height: scaleH(80),
        resizeMode: 'cover',
        marginRight: scaleH(16)
    },
    horizontal16: {
        marginHorizontal: scaleH(16)
    },
    subtitle: {
        fontSize: scaleH(14),
        lineHeight: scaleV(21.5),
        letterSpacing: 0.5,
        color: "#a0a0a0",
        textAlign: 'center'
    }
})