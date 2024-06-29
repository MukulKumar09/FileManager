import { View, Image, Pressable, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import styles, { grey } from "../../styles";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";
export default function SearchBar(props) {
    const dispatch = useDispatch()
    const state = {
        tabs: useSelector(state => state.tabs),
        cache: useSelector(state => state.cache),
    }
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

                            props.handleSort(state.cache[state.tabs[props.index]["path"]].filter((item) =>
                                item["name"].toLowerCase().includes(text = text.toLowerCase())
                            ))
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
                    <MaterialIcon iconName="close" />
                </Pressable>
            </View>
        </View>
    )
}