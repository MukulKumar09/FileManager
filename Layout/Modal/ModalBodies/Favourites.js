import {Text, View, Pressable} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import SmallGrayText from '../../../Common/SmallGrayText/SmallGrayText';
import MaterialIcon from '../../../Common/MaterialIcon/MaterialIcon';
import {Suspense} from 'react';
import SmallMaterialIcon from '../../../Common/SmallMaterialIcon/SmallMaterialIcon';
import Icon from '../../Windows/FilesList/FilesListItem/Icon/Icon';

export default function Favourites({onRequestClose, tab}) {
  const dispatch = useDispatch();
  const state = {
    favourites: useSelector(state => state.favourites),
  };
  return (
    <View style={[styles.bigGap]}>
      {state.favourites.map(item => (
        <View
          key={item.path}
          style={[styles.rowLayout, {justifyContent: 'space-between'}]}>
          <View style={[styles.rowLayout, styles.mediumGap]}>
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
          </View>
          <Pressable
            onPress={() => dispatch({type: 'REMOVEFAVORITE', payload: item})}>
            <SmallMaterialIcon name="close" color="#ffffff" />
          </Pressable>
        </View>
      ))}
      <Pressable
        style={[
          styles.pill,
          styles.rowLayout,
          styles.mediumGap,
          styles.bordered,
          styles.padding,
        ]}
        onPress={() => dispatch({type: 'ADDFAVORITE', payload: tab})}>
        <Text style={[styles.text]}>Add Current Directory</Text>
        <MaterialIcon name="plus-circle-outline" />
      </Pressable>
    </View>
  );
}
