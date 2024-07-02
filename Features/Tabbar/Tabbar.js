import { Text, Pressable, View, ScrollView, Image } from "react-native";
import TabButton from "../../Common/TabButton/TabButton";
import styles from "../../styles";
import { useSelector, useDispatch } from "react-redux"
import SmallMaterialIcon from "../../Common/SmallMaterialIcon/SmallMaterialIcon";

export default function Tabbar(props) {
    const dispatch = useDispatch()
    const state = {
        tabs: useSelector(state => state.tabs),
        clipboardItems: useSelector(state => state.clipboardItems),
        operationType: useSelector(state => state.operationType),
        currentTab: useSelector(state => state.currentTab),
        tabCounter: useSelector(state => state.tabCounter),
    }
    return (
        <View style={[styles.rowLayout,
        styles.mediumGap, { paddingTop: 10, justifyContent: 'space-between' }]}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <View
                    style={[styles.rowLayout,
                    styles.mediumGap]}
                >
                    {
                        Object.keys(state.tabs).map((index) => {
                            return (
                                <TabButton
                                    key={index}
                                    index={index}
                                    width={props.width}
                                />
                            )
                        }
                        )
                    }
                </View>
            </ScrollView>
            <>
                {state.clipboardItems.length > 0 && [0, 1].includes(state.operationType) ?
                    <Pressable
                        style={
                            [
                                styles.pill,
                                styles.bordered,
                                styles.padding
                            ]
                        }
                        onPressIn={() => {
                            dispatch({
                                type: "OPERATIONDEST",
                                payload: state.tabs[state.currentTab]["path"]
                            })
                            dispatch({
                                type: "OPERATIONWINDOW"
                            })
                        }}>
                        <SmallMaterialIcon name="content-paste" />
                    </Pressable>
                    : null}

                <Pressable
                    style={[
                        styles.pill,
                        styles.padding
                    ]}
                    onPressIn={() => {
                        dispatch({
                            type: "DUPLICATETAB",
                            payload: {
                                tabKey: state.tabCounter,
                                title: state.tabs[state.currentTab]["title"],
                                path: state.tabs[state.currentTab]["path"],
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

                    }}>
                    <SmallMaterialIcon name="plus" />
                </Pressable>
            </>
        </View>
    )
}