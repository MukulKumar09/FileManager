import { Text, Pressable, View, Image, Modal } from "react-native";
import styles, { backgroundColor } from "../../styles";

export default function SortModal(props) {
    return (
        <Modal
            transparent={true}
        >
            <Pressable
                style={
                    [
                        styles.modalBackground
                    ]
                }
                onPress={() => props.setSortModal(0)}
            >
                <View style={
                    {
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        position: 'absolute'
                    }
                }
                />
            </Pressable>

            <View style={
                [
                    styles.pill,
                    styles.modal,
                    styles.bigGap,
                    styles.padding,
                    {
                        backgroundColor: backgroundColor,
                        position: 'absolute',
                        left: 10,
                        right: 10,
                        bottom: 10,
                    }
                ]} >
                <View style={[styles.rowLayout, styles.bigGap]}>
                    <Image
                        style={[styles.imageIcon]}
                        source={require('../../assets/sort.png')} />
                    <Text style={
                        [
                            styles.text,
                            styles.headingText
                        ]
                    }> Sort </Text>
                </View>
                <View style={[styles.divider]} />
                <View style={[styles.rowLayout, styles.mediumGap]}>
                    <Pressable
                        style={
                            [
                                styles.pill,
                                styles.wide,
                                styles.centered,
                                props.sortType == 0 ? styles.pillHighlight : null,
                                styles.padding]
                        }
                        onPressIn={() => props.setSortType(0)}
                    >
                        <Text style={[styles.text]}> Name </Text>
                    </Pressable>
                    <Pressable
                        style={
                            [
                                styles.pill,
                                styles.wide,
                                styles.centered,
                                props.sortType == 1 ? styles.pillHighlight : null,
                                styles.padding]}
                        onPressIn={() => props.setSortType(1)}
                    >
                        <Text style={[styles.text]}> Type </Text>
                    </Pressable>
                </View>
                <View style={[styles.rowLayout, styles.mediumGap]} >
                    <Pressable
                        style={
                            [
                                styles.pill,
                                styles.wide,
                                styles.centered,
                                props.sortType == 2 ? styles.pillHighlight : null,
                                styles.padding]
                        }
                        onPressIn={() => props.setSortType(2)}
                    >
                        <Text style={[styles.text]}> Date </Text>
                    </Pressable>
                    <Pressable
                        style={
                            [
                                styles.pill,
                                styles.wide,
                                styles.centered,
                                props.sortType == 3 ? styles.pillHighlight : null,
                                styles.padding]}
                        onPressIn={() => props.setSortType(3)}
                    >
                        <Text style={[styles.text]}> Size </Text>
                    </Pressable>
                </View>
                <View style={[styles.divider]} />
                <Pressable
                    style={
                        [
                            styles.pill,
                            styles.centered,
                            props.sortOrder == 1 ? styles.pillHighlight : null,
                            styles.padding, { width: '100%' }]
                    }
                    onPressIn={() => props.setSortOrder(!props.sortOrder)}
                >
                    <Text style={[styles.text]}> {props.sortOrder ? "Descending" : "Ascending"} </Text>
                </Pressable>
                <View style={[styles.divider]} />
                <View style={
                    [styles.rowLayout,
                    styles.mediumGap]
                }>
                    <Pressable
                        style={
                            [
                                styles.pill,
                                styles.wide,
                                styles.centered,
                                styles.padding]
                        }
                        onPressIn={() => props.setSortModal(0)}
                    >
                        <Text style={[styles.text]}> Cancel </Text>
                    </Pressable>
                    <Pressable
                        style={
                            [
                                styles.pill,
                                styles.wide,
                                styles.centered,
                                styles.pillHighlight,
                                styles.padding]}
                        onPressIn={() => props.handleSort()}
                    >
                        <Text style={[styles.text]}> Done </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}