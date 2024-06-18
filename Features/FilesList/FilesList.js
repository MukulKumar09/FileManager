import { VirtualizedList } from "react-native";
import ListItem from "../../Common/ListItem/ListItem";

const FilesList = (props) => {
    return (
        <VirtualizedList
            onRefresh={() => {
                props.buildCache(props.tabData["path"])
                props.setSelectedItems([])
                props.setSelectedItem([])
            }
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
                    selectedItems={props.selectedItems}
                    selectedItem={props.selectedItem}
                    handlePress={props.handlePress}
                    handleLongPress={props.handleLongPress}
                    Icon={props.Icon}
                />
            }
        />
    )
}
export default FilesList