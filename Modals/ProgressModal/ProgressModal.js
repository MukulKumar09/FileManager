import { Text, View, ActivityIndicator } from "react-native";
import Animated from 'react-native-reanimated';
import styles from "../../styles";

export default function ProgressModal(props) {
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
        <Animated.View style={[
            styles.pillHighlight,
            {
                height: '100%',
                position: 'absolute',
            },
            animatedWidthStyle
        ]}>
        </Animated.View>
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
                    {operationType.current == 0 && "Copy "}
                    {operationType.current == 1 && "Move "}
                    {operationType.current == 2 && "Delete "}
                    {operationType.current == 3 && "Zipping "}
                    in progress   ({progress}%)
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