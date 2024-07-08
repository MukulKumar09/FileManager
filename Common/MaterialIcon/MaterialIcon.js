import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { grey } from '../../styles';

export default function MaterialIcon(props) {
    return (
        <MaterialCommunityIcons
            {...props}
            size={20}
            color={props.color ? props.color : grey}
        />
    )
}