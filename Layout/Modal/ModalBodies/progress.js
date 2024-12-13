import {View, Text, ActivityIndicator} from 'react-native';
import styles, {textColor} from '../../../styles/styles';
import {useDispatch} from 'react-redux';
import {useEffect, useState, useRef} from 'react';
import BorderButton from '../../../Common/BorderButton/BorderButton';
import iterateCollectedItems from '../../../Services/fileUtils/iterateCollectedItems';
import Icon from '../../Windows/FilesList/FilesListItem/Icon/Icon';

const Progress = ({onRequestClose, items, cb}) => {
  const [currItem, setItem] = useState({name: 'Loading...', ext: '/'});
  const [itemProgress, setItemProgress] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const isRunning = useRef(1);
  let totalItems;
  const dispatch = useDispatch();
  useEffect(() => {
    iterateCollectedItems(
      dispatch,
      cb,
      onRequestClose,
      items,
      isRunning,
      setItem,
    );
  }, []);

  return (
    <View style={[styles.bigGap]}>
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <Icon item={currItem} />
        <Text ellipsizeMode="tail" numberOfLines={5} style={[styles.text]}>
          {currItem.name}
        </Text>
      </View>
      <View style={[styles.wide]}>
        <View
          style={[
            styles.rowLayout,
            styles.mediumGap,
            styles.pill,
            styles.pillHighlight,
            {
              width: `${itemProgress}%`,
              padding: 5,
              alignItems: 'center',
            },
          ]}>
          <ActivityIndicator color={textColor} />
          <Text
            style={[styles.text, styles.smallText]}>{`${itemProgress}%`}</Text>
        </View>
      </View>
      <Text style={[styles.text]}>Progress</Text>
      <View style={[styles.wide]}>
        <View
          style={[
            styles.pill,
            styles.pillHighlight,
            {
              width: `${totalProgress}%`,
              padding: 5,
              alignItems: 'center',
            },
          ]}>
          <Text
            style={[styles.text, styles.smallText]}>{`${totalProgress}%`}</Text>
        </View>
      </View>
      <BorderButton
        label="Cancel"
        onPress={() => {
          isRunning.current = 0;
        }}
      />
    </View>
  );
};
export default Progress;
