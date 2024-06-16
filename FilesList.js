import { VirtualizedList } from "react-native";
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
            renderItem={props.renderItem}
        />
    )
}
export default FilesList