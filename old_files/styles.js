import { StyleSheet } from 'react-native';

let primaryColor = '#152024'
let secondaryColor = '#435860'
let highlightColor = ''
let grey = '#979899'

export default StyleSheet.create({

    centeredView: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        flexDirection: 'column',
        gap: 20,
        backgroundColor: '#06161C',
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },


    padding: {
        padding: 20
    },
    paddingVertical: {
        paddingVertical: 10
    },
    paddingHorizontal: {
        paddingHorizontal: 20
    },
    inputField: {
        flexDirection: 'row',
        borderRadius: 40,
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonBasic: {
        backgroundColor: primaryColor,
    },
    buttonHighlight: {
        backgroundColor: secondaryColor,
    },
    text: {
        fontFamily: 'Pop-reg',
        fontSize: 15
    },
    buttonTextBasic: {
        color: grey,
    },
    buttonTextHighlight: {
        color: 'white'
    }
})