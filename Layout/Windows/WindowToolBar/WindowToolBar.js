import {View} from 'react-native';
import FilterBar from '../FilterBar/FilterBar';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import StatusBar from '../StatusBar/StatusBar';

export default function WindowToolBar(props) {
  return (
    <>
      <View>
        {Boolean(props.selectionFlag) && (
          <StatusBar
            selectedItems={props.selectedItems}
            setSelectedItems={props.setSelectedItems}
            setSelectedItem={props.setSelectedItem}
            filesList={props.filesList}
          />
        )}
        <BreadCrumbs
          index={props.index}
          setSelectedItem={props.setSelectedItem}
          setSortModal={props.setSortModal}
          setSearchModal={props.setSearchModal}
          setTabPath={props.setTabPath}
          breadCrumbs={props.breadCrumbs}
          tabData={props.tabData}
        />
        {Boolean(props.searchModal) && (
          <FilterBar
            index={props.index}
            handleSort={props.handleSort}
            filesList={props.filesList}
            setSearchModal={props.setSearchModal}
          />
        )}
      </View>
    </>
  );
}
