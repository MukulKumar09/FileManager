import { Text, View, Pressable } from "react-native";
import styles from "../../styles";
import useIcon from "../../Hooks/useIcon";

export default function ListItem(props) {
    return (
        <Pressable
            style={
                [
                    styles.rowLayout,
                    styles.padding,
                    props.selectedItems.some(item => item["path"] === props.item["path"]) && styles.listItemHighlight,
                    props.selectedItem == props.item && styles.listItemSelected
                ]
            }
            onPress={() => {
                props.handlePress(props.item)
            }}
            onLongPress={() => {
                props.handleLongPress(props.item)
            }}
        >
            <View style={[
                styles.rowLayout,
                styles.wide,
                styles.bigGap,
            ]}>
                <View style={{ width: 30, }}>
                    {useIcon(props.item)}
                </View>
                <View style={[
                    styles.wide,
                ]}>
                    <Text style={[styles.text]}>{props.item["name"]}</Text>
                </View>
            </View>
            {props.item.isFile() ?
                <View style={{ width: 30, alignItems: 'flex-end' }}>
                    <Text style={[styles.text,
                    styles.smallDarkText]}>
                        {props.item["size"]}
                    </Text>
                </View>
                : null
            }
        </Pressable>
    )
}