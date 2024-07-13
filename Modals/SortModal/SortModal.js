import { Text, Pressable, View, Image, Modal } from "react-native";
import styles, { backgroundColor } from "../../styles";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";
import { useState } from "react";

export default function SortModal(props) {

    const [sortType, setSortType] = useState(props.sortType)
    const [sortOrder, setSortOrder] = useState(props.sortOrder)
    return (
        <Modal
            onRequestClose={() => props.setSortModal(0)}
            transparent={true}
        >
            <Pressable
                onPress={() => props.setSortModal(0)}
                style={[styles.modalBackground]}
            />
            <View style={[
                styles.pill,

                {
                    backgroundColor: backgroundColor,
                    position: 'absolute',
                    left: 10,
                    right: 10,
                    bottom: 10,
                }
            ]}>
                <View style={[styles.rowLayout, styles.padding, styles.bigGap]}>
                    <MaterialIcon name="sort-variant" />
                    <Text style={
                        [
                            styles.text,
                            styles.headingText
                        ]
                    }> Sort </Text>
                </View>
                <View style={[styles.divider]} />
                <View style={[styles.padding, styles.mediumGap]}>
                    <View style={[styles.rowLayout, styles.mediumGap]}>
                        <Pressable
                            style={
                                [
                                    styles.pill,
                                    styles.wide,
                                    styles.centered,
                                    sortType == 0 ? styles.pillHighlight : null,
                                    styles.padding]
                            }
                            onPressIn={() => setSortType(0)}
                        >
                            <Text style={[styles.text]}> Name </Text>
                        </Pressable>
                        <Pressable
                            style={
                                [
                                    styles.pill,
                                    styles.wide,
                                    styles.centered,
                                    sortType == 1 ? styles.pillHighlight : null,
                                    styles.padding]}
                            onPressIn={() => setSortType(1)}
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
                                    sortType == 2 ? styles.pillHighlight : null,
                                    styles.padding]
                            }
                            onPressIn={() => setSortType(2)}
                        >
                            <Text style={[styles.text]}> Date </Text>
                        </Pressable>
                        <Pressable
                            style={
                                [
                                    styles.pill,
                                    styles.wide,
                                    styles.centered,
                                    sortType == 3 ? styles.pillHighlight : null,
                                    styles.padding]}
                            onPressIn={() => setSortType(3)}
                        >
                            <Text style={[styles.text]}> Size </Text>
                        </Pressable>
                    </View>
                    <Pressable
                        style={
                            [
                                styles.pill,
                                styles.centered,
                                sortOrder == 1 ? styles.pillHighlight : null,
                                styles.padding, { width: '100%' }]
                        }
                        onPressIn={() => setSortOrder(!sortOrder)}
                    >
                        <Text style={[styles.text]}> {sortOrder ? "Descending" : "Ascending"} </Text>
                    </Pressable>
                </View>
                <View style={[styles.divider]} />
                <View style={[styles.rowLayout, styles.padding, styles.bigGap]}>
                    <View style={
                        [
                            styles.rowLayout,
                            styles.mediumGap
                        ]
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
                            onPressIn={() => {
                                props.setSortOrder(sortOrder)
                                props.setSortType(sortType)
                                props.handleSort()
                            }}
                        >
                            <Text style={[styles.text]}> Done </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}