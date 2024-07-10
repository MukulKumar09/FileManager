import { Text, Pressable } from "react-native";
import styles from "../../styles";
import MaterialIcon from "../MaterialIcon/MaterialIcon";

export default function MenuItem(props) {
    return (
        <Pressable
            style={[
                styles.rowLayout,
                styles.wide,
                styles.bigGap,
                styles.padding,
            ]}
            onPress={
                () => props.functionName()
            }
        >
            <MaterialIcon
                name={props.icon}
            />
            <Text
                style={
                    [
                        styles.text,
                        styles.wide
                    ]
                }>
                {props.name}
            </Text>
        </Pressable>
    )
}