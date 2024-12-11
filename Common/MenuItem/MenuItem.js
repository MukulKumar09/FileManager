import {Pressable, Text} from 'react-native';
import CircularButton from '../CircularButton/CircularButton';
import styles from '../../styles/styles';

export default function MenuItem({title, icon, cb}) {
  return (
    <Pressable onPress={cb} style={[styles.rowLayout, styles.text]}>
      <CircularButton
        functionName={() => {
          setOption('search');
        }}
        name={icon}
      />
      <Text style={[styles.text]}>{title}</Text>
    </Pressable>
  );
}
