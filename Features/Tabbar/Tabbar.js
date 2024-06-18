import { Text, Pressable, View, ScrollView, Image } from "react-native";
import TabButton from "../../TabButton";
import styles from "../../styles";
export default function Tabbar(props) {
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
                    // useMemo(() => (
                    Object.keys(tabs).map((index) =>
                        <TabButton
                            key={index}
                            tabData={tabs[index]}
                            index={index}
                            currTab={currTab}
                            setCurrTab={setCurrTab}
                            currTabStatic={currTabStatic}
                            // ref={ref => {
                            //     buttonRefs.current[i] = ref
                            //     console.log(i, ref)
                            // }}
                            width={width}
                            deleteCurrTab={deleteCurrTab}
                        />

                    )
                    // )
                    //     , [tabs])
                }
            </View>
        </ScrollView>
        <>
            {showPaste ?
                <Pressable
                    style={[styles.pill,
                    styles.bordered,
                    styles.padding
                    ]}
                    onPressIn={() => { startShifting() }}>
                    <Image source={require('../../assets/paste.png')} />
                </Pressable>
                : null}

            <Pressable
                style={[
                    styles.pill,
                    styles.padding
                ]}
                onPressIn={() => { addNewTab(null, null, null) }}>
                <Text style={styles.text}>+</Text>
            </Pressable>
        </>
    </View>
}