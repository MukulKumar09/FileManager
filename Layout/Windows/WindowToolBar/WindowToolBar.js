import {Pressable, Text, View} from 'react-native';
import {memo, useState} from 'react';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import styles from '../../../styles/styles';
import SmallMaterialIcon from '../../../Common/SmallMaterialIcon/SmallMaterialIcon';
import FilterBar from './FilterBar/FilterBar';

function WindowToolBar({breadCrumbs, setBreadCrumbs, searchBar, filesList}) {
  const [filterBar, setFilterBar] = useState(false);
  return (
    <View style={[styles.rowLayout, styles.marginSmall, styles.mediumGap]}>
      {Boolean(filterBar) && (
        <FilterBar filterBar={filterBar} setFilterBar={setFilterBar} />
      )}
      <Pressable style={[styles.rowLayout, styles.mediumGap]}>
        <Text
          style={[
            styles.smallPill,
            styles.text,
            styles.textDisabled,
            styles.smallText,
          ]}>
          <SmallMaterialIcon name="sort" color />
        </Text>
      </Pressable>
      {/* <Pressable
        onPress={() => setFilterBar(true)}
        style={[styles.rowLayout, styles.mediumGap]}>
        <Text
          style={[
            styles.smallPill,
            styles.text,
            styles.textDisabled,
            styles.smallText,
          ]}>
          <SmallMaterialIcon name="filter" color />
        </Text>
      </Pressable> */}
      <Text style={[styles.textDisabled]}>|</Text>
      {Boolean(searchBar) ? (
        <View
          style={[
            styles.pill,
            styles.wide,
            styles.padding,
            {alignItems: 'flex-end'},
          ]}>
          <Text style={[styles.text, styles.smallText]}>
            {filesList.length} items found
          </Text>
        </View>
      ) : (
        <BreadCrumbs
          breadCrumbs={breadCrumbs}
          setBreadCrumbs={setBreadCrumbs}
        />
      )}
    </View>
  );
}
export default memo(WindowToolBar);
