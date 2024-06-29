import { Text, Pressable, View, Image, Modal } from "react-native";
import styles, { backgroundColor } from "../../styles";
import { useSelector, useDispatch } from "react-redux"
import useFileHandler from "../../Hooks/useFileHandler";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";

export default function FavouritesModal(props) {
    const dispatch = useDispatch()
    const state = {
        favouritesModal: useSelector(state => state.favouritesModal),
        currentTab: useSelector(state => state.currentTab),
    }
    return (<Modal
        onRequestClose={() => dispatch({
            type: "FAVOURITESMODAL"
        })}
        visible={state.favouritesModal}
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
                    <MaterialIcon iconName="heart-outline" />
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
                    props.setFavouriteItems([])
                }>Clear</Text>
            </View>
            <View style={[styles.divider]} />
            <View style={[
                {
                    flexDirection: 'column',
                    width: '100%',
                }
            ]}>
                {Object.keys(props.favouriteItems).length == 0 ?
                    <Text style={[styles.text, styles.textDisabled]}>No items</Text>
                    : props.favouriteItems.map(
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
                                        useFileHandler(state.currentTab, dispatch, item)
                                        dispatch({
                                            type: "FAVOURITESMODAL"
                                        })
                                    }}
                                >
                                    <MaterialIcon iconName="folder" />
                                    <Text style={[styles.text]}>{item["title"]}</Text>
                                </Pressable>
                                <Pressable
                                    onPressIn={() => {
                                        let tempFavItems = [...props.favouriteItems]
                                        tempFavItems.splice(i, 1)
                                        props.setprops.favouriteItems(tempFavItems)
                                    }}
                                >
                                    <MaterialIcon iconName="close" />
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
                    let favPath = props.path
                    let favTitle = favPath.split("/").pop()
                    let newFavItem = {
                        'title': favTitle,
                        "path": favPath
                    }
                    if (props.favouriteItems.find((item) => item.path == favPath) == undefined) {
                        props.setFavouriteItems([...props.favouriteItems, newFavItem])
                    } else {
                        props.showToast("Item already exists")
                    }
                }}
            ><MaterialIcon iconName="folder-plus-outline" />
                <Text style={[styles.text]}>Add Current Folder</Text>
            </Pressable>
        </View>
    </Modal>
    )
}