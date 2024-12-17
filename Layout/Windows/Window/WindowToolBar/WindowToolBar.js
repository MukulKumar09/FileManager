import {Pressable, Text, View} from 'react-native';
import {memo} from 'react';
import {useDispatch} from 'react-redux';
import BreadCrumbs from '../../BreadCrumbs/BreadCrumbs';
import styles from '../../../../styles/styles';
// import FilterBar from './FilterBar/FilterBar';
import modalPromise from '../../../../Actions/modalPromise';
import Sort from '../../../Modal/ModalBodies/Sort';
import MaterialIcon from '../../../../Common/MaterialIcon/MaterialIcon';

function WindowToolBar({breadCrumbs, setBreadCrumbs}) {
  // const [filterBar, setFilterBar] = useState(false);
  const dispatch = useDispatch();
  async function openSort() {
    await modalPromise(
      dispatch,
      Sort,
      {},
      {
        icon: <MaterialIcon name="sort" />,
        heading: `Sort`,
      },
    );
  }
  return (
    <View style={[styles.rowLayout, styles.marginSmall, styles.smallGap]}>
      {/* {Boolean(filterBar) && (
        <FilterBar filterBar={filterBar} setFilterBar={setFilterBar} />
      )} */}
      <Pressable
        onPress={() => openSort()}
        style={[styles.rowLayout, styles.mediumGap]}>
        <Text
          style={[
            styles.smallPill,
            styles.text,
            styles.textGreyed,
            styles.smallText,
          ]}>
          <MaterialIcon name="sort" isSmall={true} />
        </Text>
      </Pressable>
      {/* <Pressable
        onPress={() => setFilterBar(true)}
        style={[styles.rowLayout, styles.mediumGap]}>
        <Text
          style={[
            styles.smallPill,
            styles.text,
            styles.textGreyed,
            styles.smallText,
          ]}>
          <SmallMaterialIcon name="filter" color />
        </Text>
      </Pressable> */}
      <BreadCrumbs breadCrumbs={breadCrumbs} setBreadCrumbs={setBreadCrumbs} />
    </View>
  );
}
export default memo(WindowToolBar);
