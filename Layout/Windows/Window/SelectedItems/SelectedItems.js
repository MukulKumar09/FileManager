import {Pressable, Text, View} from 'react-native';
import SmallGrayText from '../../../../Common/SmallGrayText/SmallGrayText';
import styles from '../../../../styles/styles';

export default function SelectedItems({
  selectedItems,
  setSelectedItems,
  filesList,
  setFilesList,
}) {
  console.log(selectedItems);
  return (
    <View
      style={[
        styles.rowLayout,
        styles.pill,
        styles.marginSmall,
        styles.mediumGap,
        styles.padding,
        {justifyContent: 'space-between'},
      ]}>
      <SmallGrayText>{selectedItems} items selected.</SmallGrayText>
      <Pressable
        onPress={() => {
          setFilesList([
            ...filesList.map(item => ({...item, isHighlighted: false})),
          ]);
          setSelectedItems(0);
        }}>
        <SmallGrayText
          style={{color: 'white', textDecorationLine: 'underline'}}>
          Deselect All
        </SmallGrayText>
      </Pressable>
    </View>
  );
}
