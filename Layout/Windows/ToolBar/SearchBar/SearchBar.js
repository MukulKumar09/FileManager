import {View, TextInput, Pressable, Text} from 'react-native';
import MaterialIcon from '../../../../Common/MaterialIcon/MaterialIcon';
import localSearch from '../../../../Services/rnfs/localSearch';
import styles from '../../../../styles/styles';
import SmallGrayText from '../../../../Common/SmallGrayText/SmallGrayText';

export default function SearchBar({
  searchBar,
  setSearchBar,
  setFilesList,
  tab,
}) {
  return (
    <View
      style={[
        styles.rowLayout,
        styles.mediumGap,
        styles.pill,
        styles.pillHighlight,
        // styles.bordered,
        {
          position: 'absolute',
          zIndex: 10,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 15,
          overflow: 'hidden',
        },
      ]}>
      <TextInput
        value={searchBar}
        placeholder="Search Files..."
        onChangeText={text => setSearchBar(text)}
        style={[styles.text, styles.wide]}
      />
      <Pressable
        onPress={async () => {
          setFilesList(await localSearch(tab, searchBar));
        }}
        style={[styles.pill, styles.padding, styles.bordered]}>
        <SmallGrayText>Search</SmallGrayText>
      </Pressable>
      <Pressable
        onPress={() => {
          setSearchBar(false);
        }}>
        <MaterialIcon color="white" name="close-circle-outline" />
      </Pressable>
    </View>
  );
}
