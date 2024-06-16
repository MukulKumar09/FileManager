import { StyleSheet } from 'react-native';

export let backgroundColor = '#06161C'
export let primaryColor = '#152024'
export let secondaryColor = '#435860'

// export let backgroundColor = '#14397d'
// export let primaryColor = '#77b5d9'
// export let secondaryColor = '#d7eaf3'

export let textColor = 'white'
export let highlightColor = ''
export let grey = '#979899'

export default StyleSheet.create({
    mainBody: {
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        flex: 1,
    },
    text: {
        fontFamily: 'Pop-reg',
        includeFontPadding: false,
        color: textColor,
    },
    headingText: {
        fontSize: 20,
    },
    textDisabled: {
        color: 'grey'
    },
    padding: {
        padding: 20
    },
    paddingTop: {
        paddingTop: 10
    },
    paddingCloseLeft: {
        padding: 20,
        paddingStart: 0
    },
    paddingCloseBottom: {
        margin: 10,
        marginBottom: 0
    },
    listItemHighlight: {
        backgroundColor: secondaryColor
    },
    listItemSelected: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'white'
    },
    rowLayout: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bigGap: {
        gap: 20,
    },
    mediumGap: {
        gap: 10,
    },
    smallGap: {
        gap: 5,
    },
    pill: {
        backgroundColor: primaryColor,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'

    },
    pillHighlight: {
        backgroundColor: secondaryColor,
        color: 'white'
    },
    wide: {
        flex: 1
    },
    smallPill: {
        padding: 10,
        backgroundColor: primaryColor,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        justifyContent: 'flex-start',
        paddingHorizontal: 20
    },
    modal: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    progressBar: {
        padding: 10,
        backgroundColor: secondaryColor
    },
    smallAlert: {
        justifyContent: 'space-between',
        backgroundColor: primaryColor,
        borderRadius: 20
    },
    smallText: {
        fontSize: 10,
    },
    smallDarkText: {
        color: '#979899',
        fontSize: 10
    },
    bordered: {
        borderColor: secondaryColor,
        borderWidth: 2,
        borderStyle: 'solid'
    },
    divider: {
        height: 1,
        backgroundColor: primaryColor,
        width: '100%'
    }
})