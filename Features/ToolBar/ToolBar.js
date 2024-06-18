import { Text, Pressable, View, ScrollView, Image } from "react-native";
import styles, { secondaryColor } from "../../styles";
export default function ToolBar(props) {
    return (
        <View
            style={[
                styles.paddingCloseBottom,
                styles.pill,
                {
                    alignItems: 'flex-end',
                    overflow: 'hidden'
                }]}
        >
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                    transform: [{ scaleX: -1 }]
                }}
            >
                <View style={[
                    styles.rowLayout,
                    {
                        transform: [{ scaleX: -1 }]
                    }
                ]
                }>
                    <Pressable
                        style={[styles.pill,
                        styles.padding]}
                        onPress={() => {
                            setFuncId(0)
                        }}>
                        <Image
                            style={[styles.imageIcon]}
                            source={require('../../assets/copy.png')} />
                    </Pressable>
                    <Pressable
                        style={[styles.pill,
                        styles.padding]}
                        onPress={() => {
                            setFuncId(1)
                        }}>
                        <Image
                            style={[styles.imageIcon]}
                            source={require('../../assets/move.png')} />
                    </Pressable>
                    <Pressable
                        style={[styles.pill,
                        styles.padding]}
                        onPress={() => {
                            setFuncId(3)
                        }}>
                        <Image
                            style={[styles.imageIcon]}
                            source={require('../../assets/rename.png')} />
                    </Pressable>
                    <Pressable
                        style={[styles.pill,
                        styles.padding]}
                        onPress={() => {
                            setFuncId(2)
                        }}>
                        <Image
                            style={[styles.imageIcon]}
                            source={require('../../assets/delete.png')} />
                    </Pressable>
                    <Pressable
                        style={[styles.pill,
                        styles.text,
                        styles.padding]}
                        onPress={() => { shareFiles() }}>
                        <Image
                            style={[styles.imageIcon]}
                            source={require('../../assets/share.png')} />
                    </Pressable>
                    <Text style={{ color: secondaryColor }}>  |  </Text>
                    <Pressable
                        style={[styles.pill,
                        styles.text,
                        styles.padding]}
                        onPress={() => { newItem(1) }}>
                        <Image
                            style={[styles.imageIcon]}
                            source={require('../../assets/newfile.png')} />
                    </Pressable>
                    <Pressable
                        style={[styles.pill,
                        styles.text,
                        styles.padding]}
                        onPress={() => { newItem(0) }}>
                        <Image
                            style={[styles.imageIcon]}
                            source={require('../../assets/newfolder.png')} />
                    </Pressable>
                    <Pressable
                        style={[styles.pill,
                        styles.padding]}
                        onPress={() => {
                            setFavouritesModal(1)
                        }}>
                        <Image
                            style={[styles.imageIcon]}
                            source={require('../../assets/favourite.png')} />
                    </Pressable>
                    {/* <Pressable
                        style={[styles.pill,
                        styles.text,
                        onPressIn={() => { loadDetails(selectedItems[0]["path"]) }}>
                        </Pressable> */}
                    <Pressable
                        style={[styles.pill,
                        styles.padding]}
                        onPress={() => {
                            setContextMenu(1)
                        }}>
                        <Image source={require('../../assets/horzmenu.png')} />
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}