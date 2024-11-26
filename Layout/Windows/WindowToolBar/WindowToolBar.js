import {Pressable, Text, View} from 'react-native';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import styles from '../../../styles/styles';
import SmallMaterialIcon from '../../../Common/SmallMaterialIcon/SmallMaterialIcon';

export default function WindowToolBar({breadCrumbs, setBreadCrumbs}) {
  return (
    <View style={[styles.rowLayout, styles.marginSmall, styles.mediumGap]}>
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
      <Pressable style={[styles.rowLayout, styles.mediumGap]}>
        <Text
          style={[
            styles.smallPill,
            styles.text,
            styles.textDisabled,
            styles.smallText,
          ]}>
          <SmallMaterialIcon name="filter" color />
        </Text>
      </Pressable>
      <Text style={[styles.textDisabled]}>|</Text>
      <BreadCrumbs breadCrumbs={breadCrumbs} setBreadCrumbs={setBreadCrumbs} />
    </View>
  );
}
