import { View, Image, Pressable, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import styles, { grey } from "../../styles";
export default function SearchBar(props) {
    const dispatch = useDispatch()
    return (
        <View style={[
            styles.rowLayout,
            styles.pill,
            styles.bordered,
            styles.paddingCloseBottom,
            styles.smallGap,
            {
                // position: 'absolute',
                // zIndex: 1,
                justifyContent: 'space-between',
            }
        ]}
        >
            <View style={[
                styles.input,
                styles.wide]}>
                <TextInput
                    autoFocus={true}
                    style={[styles.text,
                    styles.wide]}
                    placeholder="Search"
                    multiline={true}
                    placeholderTextColor={grey}
                    onChangeText={text => {
                        if (text == "") {
                            props.handleSort(state.cache[state.tabs[props.index]["path"]])
                        }
                        else {
                            text = new RegExp(text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'i')
                            props.handleSort(state.cache[state.tabs[props.index]["path"]].filter((item) => text.test(item["name"])))
                        }
                    }}
                />
            </View>

            <View style={[styles.rowLayout,
            styles.smallGap]}>
                <Pressable
                    style={[styles.pill,
                    styles.padding]}
                    onPressIn={() => {
                        props.handleSort(state.cache[state.tabs[props.index]["path"]])
                        props.setSearchModal(0)
                    }}>
                    <Image style={{ height: 8, width: 8 }} source={require('../../assets/close.png')} />
                </Pressable>
            </View>
        </View>
    )
}