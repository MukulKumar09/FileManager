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
                            iconName="content-copy"
                        />
                        <CircularButton
                            functionName={() => {
                                dispatch({
                                    type: "FUNCTIONID",
                                    payload: 1
                                })
                            }}
                            iconName="content-cut"
                        />
                        <CircularButton
                            functionName={() => {
                                dispatch({
                                    type: "FUNCTIONID",
                                    payload: 2
                                })
                            }}
                            iconName="delete-outline"
                        />
                        <CircularButton
                            functionName={() => dispatch({
                                type: "FUNCTIONID",
                                payload: 3
                            })}
                            iconName="square-edit-outline"
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
                            iconName="file-plus-outline"
                        />
                        <CircularButton
                            functionName={() => dispatch({
                                type: "FUNCTIONID",
                                payload: 5
                            })}
                            iconName="folder-plus-outline"
                        />
                        <CircularButton
                            functionName={() => dispatch({
                                type: "FAVOURITESMODAL"
                            })
                            }
                            iconName="heart-outline"
                        />
                    </View>
                </ScrollView>
                <CircularButton
                    functionName={() => dispatch({
                        type: "CONTEXTMENU"
                    })
                    }
                    iconName="menu"
                />
            </View>
        </>
    )
}