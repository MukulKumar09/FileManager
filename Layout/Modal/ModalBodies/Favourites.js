import {Text, View, Pressable} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcon from '../../../Common/MaterialIcon/MaterialIcon';
import realmOpen from '../../../Services/realm/realmOpen';
import FileItem from '../../../Common/FileItem/FileItem';

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
      {state.conf.favourites.length == 0 && (
        <Text style={[styles.text, styles.textGreyed]}>No items.</Text>
      )}
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
            <FileItem key={item.path} item={item} showPath={true} />
          </Pressable>
          <Pressable onPress={() => deleteFavourite(item)}>
            <MaterialIcon name="close" isSmall={true} color="#ffffff" />
          </Pressable>
        </View>
      ))}
      <Pressable
        style={[
          styles.pill,
          styles.rowLayout,
          styles.mediumGap,
          styles.centered,
          styles.bordered,
          styles.padding,
        ]}
        onPress={() => addFavourite()}>
        <MaterialIcon name="plus-circle-outline" />
        <Text style={[styles.text]}>Add Current Directory</Text>
      </Pressable>
    </View>
  );
}
