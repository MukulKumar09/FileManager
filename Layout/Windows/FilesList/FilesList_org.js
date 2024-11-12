import {Text, View, VirtualizedList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import useCache from '../../../Hooks/useCache';
import ListItem from '../../../Common/ListItem/ListItem';
import {useEffect, useRef} from 'react';
import styles from '../../../styles/styles';

const FilesList = props => {
  const dispatch = useDispatch();
  const state = {
    tabs: useSelector(state => state.tabs),
    currentTab: useSelector(state => state.currentTab),
  };
  const filesListRef = useRef(0);
  useEffect(() => {
    let findItem = props.finalList.find(
      item => props.selectedItem['path'] === item['path'],
    );
    findItem
      ? filesListRef.current.scrollToItem({
          item: findItem,
          animated: false,
          viewOffset: 500,
        })
      : filesListRef.current.scrollToOffset({
          offset: 0,
          animated: false,
        });
  }, [props.finalList]);
  const renderItem = ({item}) => (
    <ListItem
      key={item['path']}
      item={item}
      handlePress={props.handlePress}
      handleLongPress={props.handleLongPress}
      setSelectedItem={props.setSelectedItem}
      selectedItems={props.selectedItems}
      selectedItem={props.selectedItem}
    />
  );
  return (
    <VirtualizedList
      ref={filesListRef}
      onRefresh={() => useCache(dispatch, state.tabs[state.currentTab]['path'])}
      ListEmptyComponent={
        <Text style={[styles.text, styles.textDisabled, styles.padding]}>
          No items found. Possible reasons: {'\n'}
          {'\n'}
          1. No items in this Directory. {'\n'}
          2. Insufficient permissions. {'\n'}
          3. Invalid Path.
        </Text>
      }
      refreshing={false}
      data={props.finalList}
      keyExtractor={item => item.path}
      getItemLayout={(data, index) => ({
        length: 70,
        offset: 70 * index,
        index,
      })}
      getItemCount={data => data.length}
      getItem={(data, index) => data[index]}
      maxToRenderPerBatch={5}
      windowSize={3}
      updateCellsBatchingPeriod={100}
      renderItem={renderItem}
    />
  );
};
export default FilesList;
