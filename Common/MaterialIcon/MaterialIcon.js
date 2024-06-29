import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { grey } from '../../styles';

export default function MaterialIcon(props) {
    return (
        <MaterialCommunityIcons
            name={props.iconName}
            size={23}
            color={grey}
        />
    )
}