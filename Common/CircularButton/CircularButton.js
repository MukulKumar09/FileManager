import { Pressable } from "react-native";
import styles from "../../styles";
import MaterialIcon from "../MaterialIcon/MaterialIcon";

export default function CircularButton(props) {
    return (
        <Pressable
            style={[
                styles.pill,
                styles.text,
                styles.padding
            ]}
            onPress={() => { props.functionName() }}>
            <MaterialIcon
                name={props.name}
                color={props.color}
            />
        </Pressable>
    )
}