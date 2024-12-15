import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {grey} from '../../styles/styles';

export default function MaterialIcon(props) {
  return (
    <MaterialCommunityIcons
      name={props.name}
      size={props.isSmall ? 15 : 20}
      color={props.color ? props.color : grey}
    />
  );
}
