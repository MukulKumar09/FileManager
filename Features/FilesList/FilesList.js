import { VirtualizedList } from "react-native";
import { useContext } from "react";
import ListItem from "../../Common/ListItem/ListItem";
import { CombinedDispatchContext, CombinedReducersContext } from "../../Context/Context";
import CacheHandler from "../../Handlers/CacheHandler";

const FilesList = (props) => {
    const state = useContext(CombinedReducersContext)
    const dispatch = useContext(CombinedDispatchContext)
    return (
        <VirtualizedList
            onRefresh={
                async () => dispatch({
                    type: "UPDATECACHE",
                    payload: {
                        key: state.tabs[state.currentTab]["path"],
                        value: await CacheHandler(state.tabs[state.currentTab]["path"])
                    }
                })
            }
            refreshing={false}
            data={props.finalList}
            keyExtractor={item => item.path}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
            maxToRenderPerBatch={5}
            windowSize={5}
            updateCellsBatchingPeriod={100}
            renderItem={({ item }) =>
                <ListItem
                    key={item["path"]}
                    item={item}
                    handlePress={props.handlePress}
                    handleLongPress={props.handleLongPress}
                    setSelectedItem={props.setSelectedItem}
                    selectedItems={props.selectedItems}
                    selectedItem={props.selectedItem}
                    Icon={props.Icon}
                />
            }
        />
    )
}
export default FilesList