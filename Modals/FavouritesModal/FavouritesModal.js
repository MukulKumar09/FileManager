import { Text, Pressable, View, Modal } from "react-native";
import styles, { backgroundColor } from "../../styles";
import { useSelector, useDispatch } from "react-redux"
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";

export default function FavouritesModal() {
    const dispatch = useDispatch()
    const state = {
        favouriteItems: useSelector(state => state.favouriteItems),
        favouritesModal: useSelector(state => state.favouritesModal),
        tabs: useSelector(state => state.tabs),
        currentTab: useSelector(state => state.currentTab),
    }
    return (<Modal
        onRequestClose={() => dispatch({
            type: "FAVOURITESMODAL"
        })}
        transparent={true}
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
            styles.bigGap,
            styles.padding,
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
            <View style={
                {
                    width: '100%'
                }
            }>
                <View style={[styles.divider]} />
                {state.favouriteItems.length == 0 ?
                    <Text style={[styles.text, styles.textDisabled]}>No items</Text>
                    : state.favouriteItems.map(
                        (item, i) =>
                            <View
                                key={i}
                                style={
                                    [
                                        styles.rowLayout,
                                        { paddingVertical: 20 }
                                    ]
                                }>
                                <Pressable
                                    onPress={() => {
                                        dispatch({
                                            type: "MODIFYTABPATH",
                                            payload: {
                                                tabId: state.currentTab,
                                                value: item["path"]
                                            }
                                        })
                                        dispatch({
                                            type: "MODIFYTABNAME",
                                            payload: {
                                                tabId: state.currentTab,
                                                value: item["name"]
                                            }
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
                                >
                                    <MaterialIcon name="close" />
                                </Pressable>
                            </View>
                    )}
                <Pressable
                    style={[
                        styles.rowLayout,
                        styles.pill,
                        styles.bigGap,
                        styles.padding
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
    </Modal>
    )
}