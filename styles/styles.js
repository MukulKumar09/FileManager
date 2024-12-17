import {StyleSheet} from 'react-native';

export let backgroundColor = '#06161C';
export let primaryColor = '#152024';
export let secondaryColor = '#435860';

export let textColor = 'white';
export let highlightColor = '';
export let grey = '#979899';

export default StyleSheet.create({
  mainBody: {
    backgroundColor: backgroundColor,
    flexDirection: 'column',
    flex: 1,
  },
  //text
  oswald: {
    includeFontPadding: false,
    fontFamily: 'Oswald-Regular',
  },
  text: {
    color: textColor,
    fontSize: 16,
  },
  headingText: {
    fontSize: 28,
  },
  textGreyed: {
    color: 'grey',
  },
  smallText: {
    fontSize: 10,
  },
  smallDarkText: {
    color: '#979899',
    fontSize: 10,
  },
  //flexbox
  rowLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginSmall: {
    margin: 5,
  },
  padding: {
    padding: 15,
  },
  paddingVertical: {
    paddingVertical: 15,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wide: {
    flex: 1,
  },
  //flex gaps
  largeGap: {
    gap: 40,
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
  //list item
  listItemHighlighted: {
    backgroundColor: secondaryColor,
  },
  listItemHovererd: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'white',
  },
  //rounded box
  pill: {
    backgroundColor: primaryColor,
    borderRadius: 10,
  },
  pillHighlight: {
    backgroundColor: secondaryColor,
    color: 'whiter',
  },
  smallPill: {
    padding: 10,
    backgroundColor: primaryColor,
    borderRadius: 8,
    alignItems: 'center',
  },
  //icon
  imageIcon: {
    maxHeight: 20,
    width: 20,
    resizeMode: 'contain',
  },
  smallImageIcon: {
    height: 20,
    resizeMode: 'contain',
  },
  //utils
  input: {
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  modal: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  progressBar: {
    padding: 10,
    backgroundColor: secondaryColor,
  },
  divider: {
    height: 2,
    backgroundColor: backgroundColor,
    width: '100%',
  },
  bordered: {
    backgroundColor: backgroundColor,
    // borderColor: highlightColor,
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  whiteBordered: {
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: 'solid',
  },
});
