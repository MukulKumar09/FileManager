import { Text, View, ScrollView } from "react-native";
import { useContext } from "react";
import { CombinedReducersContext, CombinedDispatchContext } from "../../Context/Context"
import styles, { secondaryColor } from "../../styles";
import ContextMenu from "../ContextMenu/ContextMenu";
import CircularButton from "../../Common/CircularButton/CircularButton";
export default function ToolBar(props) {
    const state = useContext(CombinedReducersContext)
    const dispatch = useContext(CombinedDispatchContext)
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
                    styles.paddingCloseBottom,
                    styles.pill,
                    {
                        alignItems: 'flex-end',
                        overflow: 'hidden'
                    }]}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        transform: [{ scaleX: -1 }]
                    }}
                >
                    <View style={[
                        styles.rowLayout,
                        {
                            transform: [{ scaleX: -1 }]
                        }
                    ]
                    }>
                        <CircularButton
                            functionName={() => {
                                dispatch({
                                    type: "FUNCTIONID",
                                    payload: 0
                                })
                            }
                            }
                            imageUrl={require('../../assets/copy.png')}
                        />
                        <CircularButton
                            functionName={() => {
                                dispatch({
                                    type: "FUNCTIONID",
                                    payload: 1
                                })
                            }
                            }
                            imageUrl={require('../../assets/move.png')}
                        />
                        <CircularButton
                            functionName={() => {
                                dispatch({
                                    type: "FUNCTIONID",
                                    payload: 2
                                })
                            }
                            }
                            imageUrl={require('../../assets/delete.png')}
                        />
                        <CircularButton
                            functionName={() => dispatch({
                                type: "FUNCTIONID",
                                payload: 3
                            })}
                            imageUrl={require('../../assets/rename.png')}
                        />
                        <CircularButton
                            functionName={() => props.shareFiles()}
                            imageUrl={require('../../assets/share.png')}
                        />
                        <Text style={{ color: secondaryColor }}>  |  </Text>
                        <CircularButton
                            functionName={() => dispatch({
                                type: "FUNCTIONID",
                                payload: 6
                            })}
                            imageUrl={require('../../assets/newfile.png')}
                        />
                        <CircularButton
                            functionName={() => dispatch({
                                type: "FUNCTIONID",
                                payload: 5
                            })}
                            imageUrl={require('../../assets/newfolder.png')}
                        />
                        <CircularButton
                            functionName={() => dispatch({
                                type: "FAVOURITESMODAL"
                            })
                            }
                            imageUrl={require('../../assets/favourite.png')}
                        />
                        <CircularButton
                            functionName={() => dispatch({
                                type: "CONTEXTMENU"
                            })
                            }
                            imageUrl={require('../../assets/horzmenu.png')}
                        />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}