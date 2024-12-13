import {Text, View, Pressable} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import SmallGrayText from '../../../Common/SmallGrayText/SmallGrayText';
import MaterialIcon from '../../../Common/MaterialIcon/MaterialIcon';
import SmallMaterialIcon from '../../../Common/SmallMaterialIcon/SmallMaterialIcon';
import Icon from '../../Windows/FilesList/FilesListItem/Icon/Icon';
import realmOpen from '../../../Services/realm/realmOpen';

export default function Favourites({onRequestClose, tab, pushBreadCrumb}) {
  const dispatch = useDispatch();
  const state = {
    conf: useSelector(state => state.conf),
  };
  console.log('state', state.conf.favourites);
  async function addFavourite() {
    const payload = {
      ...state.conf,
      favourites: [...state.conf.favourites, tab],
    };
    const realm = await realmOpen();
    realm.write(() => {
      realm.create('conf', payload, 'modified');
    });
    dispatch({type: 'SETCONF', payload});
  }
  async function deleteFavourite(item) {
    const payload = {
      ...state.conf,
      favourites: [
        ...state.conf.favourites.filter(favItem => favItem.path !== item.path),
      ],
    };
    const realm = await realmOpen();
    realm.write(() => {
      realm.create('conf', payload, 'modified');
    });
    dispatch({type: 'SETCONF', payload});
  }
  return (
    <View style={[styles.bigGap]}>
      {state.conf.favourites.map(item => (
        <View
          key={item.path}
          style={[styles.rowLayout, {justifyContent: 'space-between'}]}>
          <Pressable
            onPress={() => {
              pushBreadCrumb({...item, isCustom: true});
              onRequestClose();
            }}
            style={[styles.rowLayout, styles.mediumGap, styles.wide]}>
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
          <Pressable onPress={() => deleteFavourite(item)}>
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
        onPress={() => addFavourite()}>
        <Text style={[styles.text]}>Add Current Directory</Text>
        <MaterialIcon name="plus-circle-outline" />
      </Pressable>
    </View>
  );
}
