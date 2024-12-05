import {View, Text, ActivityIndicator, Pressable} from 'react-native';
import styles, {textColor} from '../../../styles/styles';
import useIcon from '../../../Hooks/useIcon';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import BorderButton from '../../../Common/BorderButton/BorderButton';

const Progress = ({resolve, onRequestClose, cb, arrayOfArgs}) => {
  const [item, setItem] = useState({name: 'Loading...', ext: '/'});
  const [itemProgress, setItemProgress] = useState('0%');
  const [totalProgress, setTotalProgress] = useState('0%');
  const dispatch = useDispatch();
  useEffect(() => {
    async function callCB() {
      await cb(
        dispatch,
        ...arrayOfArgs,
        setItem,
        setItemProgress,
        setTotalProgress,
      );
      onRequestClose();
    }
    callCB();
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
              width: itemProgress,
              padding: 5,
              alignItems: 'center',
            },
          ]}>
          <ActivityIndicator color={textColor} />
          <Text style={[styles.text, styles.smallText]}>{itemProgress}</Text>
        </View>
      </View>
      <Text style={[styles.text]}>Progress</Text>
      <View style={[styles.wide]}>
        <View
          style={[
            styles.pill,
            styles.pillHighlight,
            {
              width: totalProgress,
              padding: 5,
              alignItems: 'center',
            },
          ]}>
          <Text style={[styles.text, styles.smallText]}>{totalProgress}</Text>
        </View>
      </View>
      <BorderButton label="Cancel" onPress={onRequestClose} />
    </View>
  );
};
export default Progress;
