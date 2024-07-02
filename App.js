import { useEffect } from "react";
import { View, Dimensions, Pressable, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Window from "./Window";
import styles from "./styles";
import ToolBar from "./Features/ToolBar/ToolBar";
import Tabbar from "./Features/Tabbar/Tabbar";
import MediaWindow from "./Features/MediaWindow/MediaWindow";
import Modals from "./Modals/Modals";
import useMountingPoints from "./Hooks/useMountingPoints";
import OperationWindow from "./Features/OperationWindow/OperationWindow";
import { cacheDbConnect } from "./getDbConnection/cacheDbConnect";

const App = () => {
    const dispatch = useDispatch()
    const state = {
        tabs: useSelector(state => state.tabs),
        operationWindow: useSelector(state => state.operationWindow),
    }
    // let db
    // const initDb = async () => db = await cacheDbConnect()
    // initDb()

    let width = Dimensions.get('window').width

    useEffect(() => { //first find all mounting points
        useMountingPoints(dispatch)
    }, [])

    return (
        <View style={[styles.mainBody]}>
            <Modals />

            <MediaWindow />
            <View
                style={
                    {
                        flex: 1
                    }
                }
            >
                {Object.keys(state.tabs).map((index) =>
                    <Window
                        key={index}
                        index={index}
                    />
                )}
            </View>
            {state.operationWindow ?
                <OperationWindow />
                : null}
            <ToolBar />
            <Tabbar width={width} />

            {/*
            <Pressable onPress={async () =>
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM FilesList', [], (tx, result) =>
                        console.log(result.rows.raw())
                    )
                })}><Text>FilesList</Text></Pressable>
            <Pressable onPress={async () => {
                const createTable = async () => {
                    await db.executeSql('DROP TABLE Directories');
                    await db.executeSql('DROP TABLE FilesList');
                }
                createTable()
            }
            }><Text>Delte</Text></Pressable> */}
        </View>

    );
};
export default App