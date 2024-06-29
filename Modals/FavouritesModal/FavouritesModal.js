import { Text, Pressable, View, Modal } from "react-native";
import styles, { backgroundColor } from "../../styles";
import { useSelector, useDispatch } from "react-redux"
import useFileHandler from "../../Hooks/useFileHandler";
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
        visible={state.favouritesModal ? true : false}
        transparent={true}
    >
        <Pressable
            onPressIn={() => dispatch({
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
            <View style={[
                styles.rowLayout,
                , {
                    width: '100%',
                    justifyContent: 'space-between'
                }]}>
                <View style={[styles.rowLayout, styles.bigGap]}>
                    <MaterialIcon name="heart-outline" color="#FF5252" />
                    <Text style={[
                        styles.text,
                        styles.headingText
                    ]}>Favourites</Text>
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
            <View style={[
                {
                    flexDirection: 'column',
                    width: '100%',
                }
            ]}>
                {state.favouriteItems.length == 0 ?
                    <Text style={[styles.text, styles.textDisabled]}>No items</Text>
                    : state.favouriteItems.map(
                        (item, i) =>
                            <View
                                key={i}
                                style={[
                                    styles.rowLayout,
                                ]}>
                                <Pressable
                                    style={[
                                        styles.rowLayout,
                                        styles.bigGap,
                                        styles.wide,
                                        {
                                            paddingVertical: 20
                                        }
                                    ]}
                                    onPressIn={() => {
                                        useFileHandler(state, dispatch, item)
                                        dispatch({
                                            type: "FAVOURITESMODAL"
                                        })
                                    }}
                                >
                                    <MaterialIcon name="folder" color="#FFC107" />
                                    <Text style={[styles.text]}>{item["title"]}</Text>
                                </Pressable>
                                <Pressable
                                    onPressIn={() => dispatch({
                                        type: "REMOVEFAVOURITEITEM",
                                        payload: item["path"]
                                    })}
                                >
                                    <MaterialIcon name="close" />
                                </Pressable>
                            </View>
                    )}
            </View>

            <View style={[styles.divider]} />
            <Pressable
                style={[
                    styles.rowLayout,
                    styles.pill,
                    styles.bigGap,
                    styles.padding
                    , {
                        width: '100%'
                    }]}
                onPressIn={() => {
                    if (state.favouriteItems.find((item) => item.path == state.tabs[state.currentTab]["path"]) == undefined) {
                        dispatch({
                            type: "ADDFAVOURITEITEM",
                            payload: {
                                title: state.tabs[state.currentTab]["path"].split("/").pop(),
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
            ><MaterialIcon name="folder-plus-outline" />
                <Text style={[styles.text]}>Add Current Folder</Text>
            </Pressable>
        </View>
    </Modal>
    )
}