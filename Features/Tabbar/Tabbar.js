import { Text, Pressable, View, ScrollView, Image } from "react-native";
import TabButton from "../../Common/TabButton/TabButton";
import styles from "../../styles";
import { useSelector, useDispatch } from "react-redux"
import SmallMaterialIcon from "../../Common/SmallMaterialIcon/SmallMaterialIcon";
import { useEffect, useRef, useState } from "react";

export default function Tabbar(props) {
    const dispatch = useDispatch()
    const state = {
        tabs: useSelector(state => state.tabs),
        clipboardItems: useSelector(state => state.clipboardItems),
        operationType: useSelector(state => state.operationType),
        currentTab: useSelector(state => state.currentTab),
        tabCounter: useSelector(state => state.tabCounter),
    }
    const scrollViewRef = useRef(0);
    const [position, setPosition] = useState({})
    useEffect(() => {
        console.log(position)
        scrollViewRef.current.scrollTo({ x: position[state.currentTab] })
    }, [state.currentTab, position])
    return (
        <View style={[styles.rowLayout,
        styles.mediumGap, { paddingTop: 10, justifyContent: 'space-between' }]}>
            <ScrollView
                ref={scrollViewRef}
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
                                    ext={state.tabs[index]["type"]}
                                    width={props.width}
                                    position={position}
                                    setPosition={setPosition}
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
                    onPress={() => dispatch({
                        type: "TABSCONTEXTMENU"
                    })
                    }
                >
                    <SmallMaterialIcon name="plus" />
                </Pressable>
            </>
        </View>
    )
}