import { Text, Pressable, View, Image, Modal } from "react-native";
import { useContext } from "react";
import { CombinedReducersContext, CombinedDispatchContext } from "../../Context/Context"
import styles, { backgroundColor } from "../../styles";

export default function DeleteModal(props) {
    const state = useContext(CombinedReducersContext)
    const dispatch = useContext(CombinedDispatchContext)
    return (<Modal
        transparent={true}
    >
        <Pressable
            onPressIn={() => state.deletePromiseResolver(0)} style={[styles.modalBackground]}
        />

        <View style={[
            styles.pill,
            styles.modal,
            styles.bigGap,
            styles.padding,
            {
                backgroundColor: backgroundColor,
                position: 'absolute',
                left: 10,
                right: 10,
                bottom: 10,
            }
        ]}>
            <View style={[styles.rowLayout, styles.bigGap]}>
                <Image
                    style={[styles.imageIcon]}
                    source={require('../../assets/delete.png')} />
                <Text style={[
                    styles.text,
                    styles.headingText
                ]}>Delete Item(s)?</Text>
            </View>
            <View style={[styles.divider]} />
            <Text style={[styles.text,
            styles.textDisabled]}>Following items will be deleted:</Text>
            <View style={{ flexDirection: 'column', marginBottom: 20 }}>
                {state.clipboardItems.map((item, i) =>
                    <Text key={i} style={[styles.text]}>{item["name"]}</Text>
                )}
            </View>
            <View style={[styles.rowLayout,
            styles.bigGap]}>
                <Pressable
                    onPressIn={() => {
                        state.deletePromiseResolver(0)
                    }
                    }
                    style={[styles.pill,
                    styles.centered,
                    styles.wide,
                    styles.padding]}>
                    <Text style={[styles.text]}>Cancel</Text>
                </Pressable>
                <Pressable
                    onPressIn={() => {
                        state.deletePromiseResolver(1)
                    }
                    }
                    style={[styles.pill,
                    styles.centered,
                    styles.pillHighlight,
                    styles.wide,
                    styles.padding]}>
                    <Text style={[styles.text]}>Delete</Text>
                </Pressable>
            </View>
        </View>
    </Modal>)
}