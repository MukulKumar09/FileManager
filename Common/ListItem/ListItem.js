import { Text, View, Pressable } from "react-native";
import styles from "../../styles";
import useIcon from "../../Hooks/useIcon";
import useNiceBytes from "../../Hooks/useNiceBytes";

export default function ListItem(props) {
    return (
        <Pressable
            style={
                [
                    styles.rowLayout,
                    styles.padding,
                    props.selectedItems.some(item => item["path"] === props.item["path"]) && styles.listItemHighlight,
                    props.selectedItem["path"] == props.item["path"] && styles.listItemSelected
                ]
            }
            onPressIn={() => props.setSelectedItem(props.item)}
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
                    {useIcon(props.item["fileType"])}
                </View>
                <View style={[
                    styles.wide,
                ]}>
                    <Text style={[styles.text]}>{props.item["name"]}</Text>
                </View>
            </View>
            {Boolean(props.item.isFile) &&
                <View style={{ width: 60, alignItems: 'flex-end' }}>
                    <Text style={[styles.text,
                    styles.smallDarkText]}>
                        {useNiceBytes(props.item["size"])}
                    </Text>
                </View>
            }
        </Pressable>
    )
}