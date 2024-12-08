import {View, Text, ActivityIndicator} from 'react-native';
import styles, {textColor} from '../../../styles/styles';
import useIcon from '../../../Hooks/useIcon';
import {useDispatch} from 'react-redux';
import {useEffect, useState, useRef} from 'react';
import BorderButton from '../../../Common/BorderButton/BorderButton';
import handleFile from '../../../Services/rnfs/handleFile';

const Progress = ({resolve, onRequestClose, items, cb}) => {
  const [currItem, setItem] = useState({name: 'Loading...', ext: '/'});
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
              setItem(folderItem);
              isFail += await handleFile(dispatch, cb, folderItem);
            }
            if (isFail == 0) {
              items[item] = 0;
            }
          } else {
            //if item
            setItem(items[item]);
            const isFail = await handleFile(dispatch, cb, items[item]);
            if (isFail == 0) {
              delete items[item];
            }
          }
        } else {
          onRequestClose();
          break;
        }
      }
      onRequestClose();
    }
    startIterating();
  }, []);

  return (
    <View style={[styles.bigGap]}>
      <View style={[styles.rowLayout, styles.mediumGap]}>
        {useIcon(currItem)}
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
