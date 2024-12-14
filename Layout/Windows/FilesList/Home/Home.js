import {View, Pressable, Text} from 'react-native';
import {memo} from 'react';
import {useSelector} from 'react-redux';
import SmallGrayText from '../../../../Common/SmallGrayText/SmallGrayText';
import styles from '../../../../styles/styles';
import MaterialIcon from '../../../../Common/MaterialIcon/MaterialIcon';
import Icon from '../../../Icon/Icon';

function Home({filesList, pushBreadCrumb}) {
  const state = {
    conf: useSelector(state => state.conf),
  };
  return (
    <View style={[styles.wide, styles.padding, styles.bigGap]}>
      <View style={[styles.mediumGap]}>
        {filesList.map(item => (
          <Pressable
            key={item.path}
            onPress={() => {
              pushBreadCrumb({...item, isCustom: true});
            }}
            style={[
              styles.rowLayout,
              styles.mediumGap,
              styles.pill,
              styles.padding,
            ]}>
            <Icon item={item} />
            <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.text]}>
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={[styles.pill, styles.padding, styles.bigGap]}>
        <View style={[styles.rowLayout, styles.mediumGap]}>
          <MaterialIcon name="heart" color="#FF5252" />
          <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.text]}>
            Favourites
          </Text>
        </View>
        <View style={[styles.divider]} />
        {state.conf.favourites.length == 0 && (
          <Text style={[styles.text, styles.textGreyed]}>No items.</Text>
        )}
        {state.conf.favourites.map(item => (
          <Pressable
            key={item.path}
            onPress={() => {
              pushBreadCrumb({...item, isCustom: true});
            }}
            style={[styles.rowLayout, styles.mediumGap]}>
            <Icon item={item} />
            <View>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[styles.text]}>
                {item.name}
              </Text>
              <SmallGrayText ellipsizeMode="tail" numberOfLines={2}>
                {item.path}
              </SmallGrayText>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
export default memo(Home);
