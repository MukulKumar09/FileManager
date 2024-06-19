import { View, Image, Pressable, TextInput } from "react-native";
import styles, { grey } from "../../styles";
export default function SearchBar(props) {
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
                            props.handleSort(props.filesList)
                        }
                        else {
                            text = new RegExp(text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'i')
                            props.handleSort(props.filesList.filter((item) => text.test(item["name"])))
                        }
                    }}
                />
            </View>

            <View style={[styles.rowLayout,
            styles.smallGap]}>
                {/* <Pressable
                                style={[styles.rowLayout,
                                styles.pill, deepSearch ? styles.pillHighlight : null,
                                styles.padding]}
                                onPressIn={() => { setDeepSearch(!deepSearch) }}>
                                <Text style={[styles.text]}>Deep</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.pill,
                                styles.pillHighlight,
                                styles.padding]}
                                onPressIn={() => { }}>
                                <Image source={require('./assets/search.png')} />
                            </Pressable> */}
                <Pressable
                    style={[styles.pill,
                    styles.padding]}
                    onPressIn={() => {
                        props.handleSort(props.filesList)
                        props.setSearchFlag(0)
                    }}>
                    <Image style={{ height: 8, width: 8 }} source={require('../../assets/close.png')} />
                </Pressable>
            </View>
        </View>
    )
}