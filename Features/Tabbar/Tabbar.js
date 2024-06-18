import { Text, Pressable, View, ScrollView, Image } from "react-native";
import TabButton from "../../Common/TabButton/TabButton";
import styles from "../../styles";

export default function Tabbar(props) {
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
                        Object.keys(props.tabs).map((index) => {
                            console.log("button: ", index)
                            return (
                                <TabButton
                                    key={index}
                                    tabData={props.tabs[index]}
                                    index={index}
                                    currTab={props.currTab}
                                    setCurrTab={props.setCurrTab}
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
                    onPressIn={() => { props.addNewTab(null, null, null) }}>
                    <Text style={styles.text}>+</Text>
                </Pressable>
            </>
        </View>
    )
}