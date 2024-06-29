import { useEffect, useReducer, useState } from "react";
import { View, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import Window from "./Window";
import styles from "./styles";
import ToolBar from "./Features/ToolBar/ToolBar";
import Tabbar from "./Features/Tabbar/Tabbar";
import MediaWindow from "./Features/MediaWindow/MediaWindow";
import Modals from "./Modals/Modals";
import useMountingPoints from "./Hooks/useMountingPoints";
import OperationWindow from "./Features/OperationWindow/OperationWindow";

const App = () => {

    const dispatch = useDispatch()
    //modals
    const [favouriteItems, setFavouriteItems] = useState([
        {
            title: "Test",
            path: "/storage/emulated/0/bbs (1)",
            isDirectory: () => 1
        }
    ])

    let width = Dimensions.get('window').width

    useEffect(() => { //first find all mounting points
        useMountingPoints(dispatch)
    }, [])

    return (
        <View style={[styles.mainBody]}>
            <Modals
                favouriteItems={favouriteItems}
            />

            <MediaWindow />
            <View
                style={
                    {
                        flex: 1
                    }
                }
            >
                {Object.keys(useSelector(state => state.tabs)).map((index) =>
                    <Window
                        key={index}
                        index={index}
                    />
                )}
            </View>
            {useSelector(state => state.operationWindow) ?
                <OperationWindow />
                : null}
            <ToolBar />
            <Tabbar width={width} />

            {/* <Pressable onPress={() => dispatch({
                    type: "SETPROGRESS",
                    payload: 60
                })}><Text>SHow all</Text></Pressable> */}
        </View>

    );
};
export default App