import { Text, View, ActivityIndicator } from "react-native";
import { useContext, useEffect } from "react";
import { CombinedReducersContext, CombinedDispatchContext } from "../../Context/Context"
import Animated from 'react-native-reanimated';
import styles from "../../styles";
import CollectAllItemsHandler from "../../Handlers/CollectAllItemsHandler";
import CopyHandler from "../../Handlers/CopyHandler";
import MoveHandler from "../../Handlers/MoveHandler";
import RNFS from 'react-native-fs';

export default function OperationWindow() {
    const state = useContext(CombinedReducersContext)
    const dispatch = useContext(CombinedDispatchContext)
    useEffect(() => {
        const startOperation = async () => {
            let collectedItems = await CollectAllItemsHandler(state.clipboardItems, state.operationDest)
            for (item of collectedItems) {
                dispatch({
                    type: "ITEMINOPERATION",
                    payload: item["name"]
                })
                if (await RNFS.exists(state.operationDest + "/" + item["name"])) {
                    dispatch({
                        type: "ITEMEXISTSMODAL"
                    })
                    let decision = await new Promise((resolve) => {
                        dispatch({
                            type: "ITEMEXISTSPROMISERESOLVER",
                            payload: resolve
                        })
                    })
                    switch (decision) {
                        case 0: { //skip
                            dispatch({
                                type: "TOAST",
                                payload: "Item skipped"
                            })
                            dispatch({
                                type: "ITEMEXISTSMODAL"
                            })
                            break
                        }
                        case 1: { //overwrite
                            dispatch({
                                type: "ITEMEXISTSMODAL"
                            })
                            if (state.operationType)
                                await MoveHandler(item["path"], state.operationDest)
                            else
                                await CopyHandler(item["path"], state.operationDest)
                            break
                        }
                        default: { //rename
                            if (state.operationType)
                                await MoveHandler(item["path"], decision)
                            else
                                await CopyHandler(item["path"], decision)
                            break
                        }
                    }
                } else {
                    if (state.operationType)
                        await MoveHandler(item["path"], item["name"])
                    else
                        await CopyHandler(item["path"], item["name"])
                }
            }

        }
        startOperation()
    }, [])
    return (<View style={[
        styles.pill,
        styles.paddingCloseBottom,
        {
            position: 'absolute',
            zIndex: 2,
            top: 0,
            left: 0,
            right: 0,
            alignItems: 'flex-start',
            overflow: 'hidden'
        }
    ]}>
        {/* <Animated.View style={[
            styles.pillHighlight,
            {
                height: '100%',
                position: 'absolute',
            },
            animatedWidthStyle
        ]}>
        </Animated.View> */}
        <View
            style={[
                styles.rowLayout,
                , {
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    justifyContent: 'space-between'
                }]}
        >
            <View style={[
                styles.rowLayout,
                styles.mediumGap,
                styles.wide,
            ]}>
                <ActivityIndicator />
                <Text

                    style={[
                        styles.text,
                        styles.smallText
                    ]}>
                    {state.operationType.current == 0 && "Copy"}
                    {state.operationType.current == 1 && "Move"}
                    {state.operationType.current == 2 && "Delete"}
                    {state.operationType.current == 3 && "Zipp"}
                    ing {state.itemInOperation}   (90%)
                </Text>
            </View>
            <Text style={[
                styles.text,
                styles.smallText,
                {
                    textDecorationLine: 'underline'
                }
            ]} onPress={() => deselectAll()}>Cancel</Text>
        </View>
    </View>
    )
}