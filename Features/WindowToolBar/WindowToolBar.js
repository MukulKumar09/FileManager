import { View } from "react-native";
import SearchBar from "../SearchBar/SearchBar";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import StatusBar from "../StatusBar/StatusBar";

export default function WindowToolBar(props) {
    return (
        <>
            <View>
                {props.selectionFlag ?
                    <StatusBar
                        selectedItems={props.selectedItems}
                        setSelectedItems={props.setSelectedItems}
                        setSelectedItem={props.setSelectedItem}
                        filesList={props.filesList}
                    />
                    : null
                }
                <BreadCrumbs
                    setSortModal={props.setSortModal}
                    setSearchFlag={props.setSearchFlag}
                    setTabPath={props.setTabPath}
                    breadCrumbs={props.breadCrumbs}
                    tabData={props.tabData}
                />
                {props.searchFlag ?
                    <SearchBar
                        index={props.index}
                        handleSort={props.handleSort}
                        filesList={props.filesList}
                        setSearchFlag={props.setSearchFlag}
                    />
                    : null}
            </View>
        </>
    )
}