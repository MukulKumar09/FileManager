import { Text, View, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import styles, { secondaryColor } from "../../styles";
import ContextMenu from "../ContextMenu/ContextMenu";
import CircularButton from "../../Common/CircularButton/CircularButton";


export default function ToolBar(props) {
    const dispatch = useDispatch()
    const state = {
        contextMenu: useSelector(state => state.contextMenu),
    }
    return (
        <>
            {
                state.contextMenu ?
                    <ContextMenu
                        setContextMenu={props.setContextMenu}
                        setClipBoardModal={props.setClipBoardModal}
                        setAboutModal={props.setAboutModal}
                    />
                    : null
            }
            <View
                style={[
                    styles.rowLayout,
                    styles.paddingCloseBottom,
                    styles.pill,
                    {
                        overflow: 'hidden'
                    }]}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={[
                        styles.rowLayout
                    ]}>


                        <CircularButton
                            functionName={() => {
                                dispatch({
                                    type: "FUNCTIONID",
                                    payload: 0
                                })
                            }
                            }
                            name="content-copy"
                        />
                        <CircularButton
                            functionName={() => {
                                dispatch({
                                    type: "FUNCTIONID",
                                    payload: 1
                                })
                            }}
                            name="content-cut"
                        />
                        <CircularButton
                            functionName={() => {
                                dispatch({
                                    type: "FUNCTIONID",
                                    payload: 2
                                })
                            }}
                            name="delete-outline"
                        />
                        <CircularButton
                            functionName={() => dispatch({
                                type: "FUNCTIONID",
                                payload: 3
                            })}
                            name="square-edit-outline"
                        />
                        {/* <CircularButton
                            functionName={() => props.shareFiles()}
                            imageUrl={require('../../assets/share.png')}
                        /> */}
                        <Text style={{ color: secondaryColor }}>  |  </Text>
                        <CircularButton
                            functionName={() => dispatch({
                                type: "FUNCTIONID",
                                payload: 6
                            })}
                            name="file-plus-outline"
                        />
                        <CircularButton
                            functionName={() => dispatch({
                                type: "FUNCTIONID",
                                payload: 5
                            })}
                            name="folder-plus-outline"
                        />
                        <CircularButton
                            functionName={() => dispatch({
                                type: "FAVOURITESMODAL"
                            })
                            }
                            name="heart-outline" color="#FF5252"
                        />
                    </View>
                </ScrollView>
                <CircularButton
                    functionName={() => dispatch({
                        type: "CONTEXTMENU"
                    })
                    }
                    name="menu"
                />
            </View>
        </>
    )
}