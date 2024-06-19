import { Text, View, ScrollView } from "react-native";
import styles, { secondaryColor } from "../../styles";
import ContextMenu from "../ContextMenu/ContextMenu";
import CircularButton from "../../Common/CircularButton/CircularButton";
export default function ToolBar(props) {
    return (
        <>
            {
                props.contextMenu ?
                    <ContextMenu
                        setContextMenu={props.setContextMenu}
                        deleteAllTabs={props.deleteAllTabs}
                        deleteCurrTab={props.deleteCurrTab}
                        deleteOtherTabs={props.deleteOtherTabs}
                        buildCache={props.buildCache}
                        setClipBoardModal={props.setClipBoardModal}
                        setAboutModal={props.setAboutModal}
                    />
                    : null
            }
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
                        <CircularButton
                            functionName={() => props.setFuncId(0)}
                            imageUrl={require('../../assets/copy.png')}
                        />
                        <CircularButton
                            functionName={() => props.setFuncId(1)}
                            imageUrl={require('../../assets/move.png')}
                        />
                        <CircularButton
                            functionName={() => props.setFuncId(2)}
                            imageUrl={require('../../assets/delete.png')}
                        />
                        <CircularButton
                            functionName={() => props.setFuncId(3)}
                            imageUrl={require('../../assets/rename.png')}
                        />
                        <CircularButton
                            functionName={() => props.shareFiles()}
                            imageUrl={require('../../assets/share.png')}
                        />
                        <Text style={{ color: secondaryColor }}>  |  </Text>
                        <CircularButton
                            functionName={() => props.newItem(1)}
                            imageUrl={require('../../assets/newfile.png')}
                        />
                        <CircularButton
                            functionName={() => props.newItem(0)}
                            imageUrl={require('../../assets/newfolder.png')}
                        />
                        <CircularButton
                            functionName={() => props.setFavouritesModal(1)}
                            imageUrl={require('../../assets/favourite.png')}
                        />
                        <CircularButton
                            functionName={() => props.newItem(1)}
                            imageUrl={require('../../assets/newfile.png')}
                        />
                        <CircularButton
                            functionName={() => props.setContextMenu(1)}
                            imageUrl={require('../../assets/horzmenu.png')}
                        />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}