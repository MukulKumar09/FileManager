import { Text, Pressable, View, ScrollView, Image } from "react-native";
import TabButton from "../../Common/TabButton/TabButton";
import styles from "../../styles";
import { CombinedDispatchContext, CombinedReducersContext } from "../../Context/Context";
import { useContext } from "react";

export default function Tabbar(props) {
    const state = useContext(CombinedReducersContext)
    const dispatch = useContext(CombinedDispatchContext)
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
                                    currTabStatic={props.currTabStatic}
                                    // ref={ref => {
                                    //     buttonRefs.current[i] = ref
                                    //     console.log(i, ref)
                                    // }}
                                    width={props.width}
                                    deleteCurrTab={props.deleteCurrTab}
                                />
                            )
                        }
                        )
                    }
                </View>
            </ScrollView>
            <>
                {props.showPaste ?
                    <Pressable
                        style={[styles.pill,
                        styles.bordered,
                        styles.padding
                        ]}
                        onPressIn={() => { props.startShifting() }}>
                        <Image source={require('../../assets/paste.png')} />
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
                    <Text style={styles.text}>+</Text>
                </Pressable>
            </>
        </View>
    )
}