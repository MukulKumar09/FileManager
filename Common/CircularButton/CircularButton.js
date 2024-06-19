import { Pressable, Image } from "react-native";
import styles from "../../styles";

export default function CircularButton(props) {
    return (
        <Pressable
            style={[
                styles.pill,
                styles.text,
                styles.padding
            ]}
            onPress={() => { props.functionName() }}>
            <Image
                style={[styles.imageIcon]}
                source={props.imageUrl}
            />
        </Pressable>
    )
}