import { Text, Pressable, View, Modal } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import styles, { backgroundColor } from "../../styles";
import { useSelector, useDispatch } from "react-redux"
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";

export default function FavouritesModal() {
    const dispatch = useDispatch()
    const state = {
        tabs: useSelector(state => state.tabs),
        tabCounter: useSelector(state => state.tabCounter),
        currentTab: useSelector(state => state.currentTab),
        favouriteItems: useSelector(state => state.favouriteItems),
        favouritesModal: useSelector(state => state.favouritesModal),
    }
    return (
        <Modal
            onRequestClose={() => dispatch({
                type: "FAVOURITESMODAL"
            })}
            transparent={true}
        >
            <Animated.View
                entering={FadeInDown.duration(50)}
                exiting={FadeOutDown.duration(50)}
                style={[styles.wide]}
            >
                <Pressable
                    onPress={() => dispatch({
                        type: "FAVOURITESMODAL"
                    })}
                    style={[styles.modalBackground]}
                />
                <View style={[
                    styles.pill,
                    styles.modal,
                    {
                        backgroundColor: backgroundColor,
                        position: 'absolute',
                        left: 10,
                        right: 10,
                        bottom: 10,
                    }
                ]}>
                    <View style={
                        [
                            styles.rowLayout,
                            styles.padding,
                        ]
                    }>
                        <View style={
                            [
                                styles.rowLayout,
                                styles.bigGap,
                                styles.wide,
                            ]
                        }>
                            <MaterialIcon name="heart" color="#FF5252" />
                            <Text style={
                                [
                                    styles.text,
                                    styles.headingText
                                ]
                            }>Favourites</Text>
                        </View>
                        <Text style={[
                            styles.text,
                            styles.textDisabled,
                            {
                                textDecorationLine: 'underline'
                            }
                        ]} onPress={() =>
                            dispatch({
                                type: "CLEARFAVOURITES"
                            })
                        }>Clear</Text>
                    </View>
                    <View style={[styles.divider]} />
                    <View style={
                        [
                            { width: '100%' }
                        ]
                    }>
                        {state.favouriteItems.length == 0 ?
                            <Text style={
                                [
                                    styles.text,
                                    styles.textDisabled,
                                    styles.padding
                                ]
                            }>No items</Text>
                            : state.favouriteItems.map(
                                (item, i) =>
                                    <View
                                        key={i}
                                        style={
                                            [
                                                styles.rowLayout,
                                            ]
                                        }>
                                        <Pressable
                                            onPress={() => {
                                                dispatch({
                                                    type: "ADDTAB",
                                                    payload: {
                                                        tabKey: state.tabCounter,
                                                        title: item["name"],
                                                        path: item["path"],
                                                        type: "filebrowser",
                                                    }
                                                })
                                                dispatch({
                                                    type: "SETCURRENTTAB",
                                                    payload: state.tabCounter
                                                })
                                                dispatch({
                                                    type: "INCREASETABCOUNTER",
                                                })
                                                dispatch({
                                                    type: "FAVOURITESMODAL"
                                                })
                                            }}
                                            style={
                                                [
                                                    styles.rowLayout,
                                                    styles.wide,
                                                    styles.bigGap,
                                                    styles.padding,
                                                ]
                                            }
                                        >
                                            <MaterialIcon name="folder" color="#FFC107" />
                                            <Text style={[styles.text]}>{item["name"]}</Text>
                                        </Pressable>
                                        <Pressable
                                            onPress={() => dispatch({
                                                type: "REMOVEFAVOURITEITEM",
                                                payload: item["path"]
                                            })}
                                            style={
                                                [
                                                    styles.padding
                                                ]
                                            }
                                        >
                                            <MaterialIcon name="close" />
                                        </Pressable>
                                    </View>
                            )}
                    </View>
                    <View style={[styles.divider]} />
                    <View style={
                        [
                            styles.wide,
                            styles.padding,
                            {
                                width: '100%'
                            }
                        ]
                    }>
                        <Pressable
                            style={[
                                styles.rowLayout,
                                styles.pill,
                                styles.bigGap,
                                styles.padding,
                            ]}
                            onPressIn={() => {
                                if (state.favouriteItems.find((item) => item.path == state.tabs[state.currentTab]["path"]) == undefined) {
                                    dispatch({
                                        type: "ADDFAVOURITEITEM",
                                        payload: {
                                            name: state.tabs[state.currentTab]["path"].split("/").pop(),
                                            path: state.tabs[state.currentTab]["path"],
                                            isDirectory: () => 1
                                        }
                                    })
                                } else {
                                    dispatch({
                                        type: "TOAST",
                                        payload: "Item exists in favorite."
                                    })
                                }
                            }}
                        >
                            <MaterialIcon name="folder-plus-outline" />
                            <Text style={[styles.text]}>Add Current Folder</Text>
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
        </Modal>
    )
}