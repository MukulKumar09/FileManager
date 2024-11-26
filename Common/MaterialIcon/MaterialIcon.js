import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {grey} from '../../styles/styles';

export default function MaterialIcon(props) {
  return (
    <MaterialCommunityIcons
      {...props}
      size={20}
      style={{width: 30, textAlign: ''}}
      color={props.color ? props.color : grey}
    />
  );
}
