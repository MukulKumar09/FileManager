import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {grey} from '../../styles';

export default function SmallMaterialIcon(props) {
  return (
    <MaterialCommunityIcons
      {...props}
      size={15}
      color={props.color ? props.color : '#ffffff'}
    />
  );
}
