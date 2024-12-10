import {
  View,
  TextInput,
  Pressable,
  Text,
  ActivityIndicator,
} from 'react-native';
import MaterialIcon from '../../../../Common/MaterialIcon/MaterialIcon';
import localSearch from '../../../../Services/rnfs/localSearch';
import styles from '../../../../styles/styles';
import SmallGrayText from '../../../../Common/SmallGrayText/SmallGrayText';
import {useState} from 'react';

export default function SearchBar({
  filesList,
  searchBar,
  setSearchBar,
  setFilesList,
  tab,
}) {
  const [isSearching, setIsSearching] = useState(false);
  return (
    <View
      style={[
        styles.rowLayout,
        styles.mediumGap,
        styles.pill,
        styles.bordered,
        {
          position: 'absolute',
          zIndex: 10,
          left: 0,
          right: 0,
          paddingHorizontal: 15,
        },
      ]}>
      {isSearching ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.text, styles.smallText]}>
          ({filesList.length})
        </Text>
      )}
      <TextInput
        value={searchBar}
        placeholder="Search Files..."
        onChangeText={text => setSearchBar(text)}
        style={[styles.text, styles.wide]}
      />
      <Pressable
        onPress={async () => {
          setIsSearching(true);
          let results = await localSearch(tab, searchBar);
          setFilesList(results);
          setIsSearching(false);
        }}
        style={[styles.padding]}>
        <SmallGrayText style={{color: 'white'}}>Search</SmallGrayText>
      </Pressable>
      <Pressable
        onPress={() => {
          setSearchBar(false);
        }}>
        <MaterialIcon color="white" name="close" />
      </Pressable>
    </View>
  );
}
