import {View, Text, ActivityIndicator, Pressable} from 'react-native';
import styles, {textColor} from '../../../styles/styles';
import useIcon from '../../../Hooks/useIcon';
import {useDispatch} from 'react-redux';
import {useEffect, useState, useRef} from 'react';
import BorderButton from '../../../Common/BorderButton/BorderButton';
import handleFile from '../../../Services/rnfs/handleFile';
import Confirm from './Confirm';
import modalPromise from '../../../Actions/modalPromise';
import MaterialIcon from '../../../Common/MaterialIcon/MaterialIcon';
import moveItem from '../../../Services/rnfs/moveItem';

const Progress = ({resolve, onRequestClose, items, cb}) => {
  const [item, setItem] = useState({name: 'Loading...', ext: '/'});
  const [itemProgress, setItemProgress] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const isRunning = useRef(1);
  let totalItems;
  const dispatch = useDispatch();
  useEffect(() => {
    totalItems = items['/<>numberOfItems'];
    delete items['/<>numberOfItems'];
    async function startIterating() {
      for (let item of Object.keys(items)) {
        if (isRunning.current) {
          if (Array.isArray(items[item])) {
            let isFail = 0;
            for (let folderItem of items[item]) {
              isFail += await handleFile(dispatch, cb, folderItem);
            }
            if (isFail == 0) {
              items[item] = 0;
            }
          } else {
            //if item
            const isFail = await handleFile(dispatch, cb, items[item]);
            if (isFail == 0) {
              delete items[item];
            }
          }
        } else {
          const isConfirmCancel = await modalPromise(
            dispatch,
            Confirm,
            {
              description: 'Are you sure want to cancel?',
            },
            {
              icon: <MaterialIcon name="content-paste" />,
              heading: 'Confirm Cancel?',
            },
          );
          console.log('isConfirmCancel:', isConfirmCancel);
          if (isConfirmCancel) {
            console.log('cancelled');
            onRequestClose();
            break;
          } else {
            isRunning.current = 1;
          }
        }
      }
      onRequestClose();
    }
    startIterating();
  }, []);

  return (
    <View style={[styles.bigGap]}>
      <View style={[styles.rowLayout, styles.mediumGap]}>
        {useIcon(item)}
        <Text ellipsizeMode="tail" numberOfLines={5} style={[styles.text]}>
          {item.name}
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
