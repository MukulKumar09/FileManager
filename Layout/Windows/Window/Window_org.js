import {useEffect, useMemo, useState} from 'react';
import {BackHandler, Text, View, Pressable, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MaterialIcon from '../../../Common/MaterialIcon/MaterialIcon';
import FilesList from '../FilesList/FilesList';
import SortModal from '../../../Modals/SortModal/SortModal';
import WindowToolBar from '../WindowToolBar/WindowToolBar';
import useFileHandler from '../../../Hooks/useFileHandler';
import useSort from '../../../Hooks/useSort';
import useRangeSelect from '../../../Hooks/useRangeSelect';
import useCache from '../../../Hooks/useCache';
import useNavigateParent from '../../../Hooks/useNavigateParent';
import styles, {backgroundColor} from '../../../styles/styles';
import ToolBar from '../ToolBar/ToolBar';

const Window = props => {
  const dispatch = useDispatch();
  const state = {
    tabs: useSelector(state => state.tabs),
    currentTab: useSelector(state => state.currentTab),
    clipboardItems: useSelector(state => state.clipboardItems),
    tabCounter: useSelector(state => state.tabCounter),
    cache: useSelector(state => state.cache['Home']),
    functionId: useSelector(state => state.functionId),
    mediaBox: useSelector(state => state.mediaBox),
    recycleBin: useSelector(state => state.recycleBin),
    favouriteItems: useSelector(state => state.favouriteItems),
  };
  const [filesList, setFilesList] = useState([]);
  const [searchModal, setSearchModal] = useState(0);
  const [contextMenu, setContextMenu] = useState(0);
  //selection
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectionFlag, setSelectionFlag] = useState(0);
  //sorting
  const [sortModal, setSortModal] = useState(0);
  const [sortType, setSortType] = useState(1);
  const [sortOrder, setSortOrder] = useState(0);

  const tabPath = useSelector(state => state.tabs[props.index]['path']);
  const cache = useSelector(state => state.cache[tabPath]);

  useEffect(() => {
    if (state.currentTab == props.index) {
      const backAction = () => {
        if (state.tabs[props.index]['path'] == 'Home') {
          return false;
        } else {
          setSelectedItem({path: state.tabs[props.index]['path']});
          setContextMenu(0);
          useNavigateParent(state, dispatch);
        }
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
  }, [state.tabs, state.currentTab, state.cache]);

  useEffect(() => {
    //first
    if (tabPath !== 'Home' && cache == undefined) {
      useCache(dispatch, tabPath);
    }
  }, [tabPath]);

  useEffect(() => {
    if (cache) {
      handleSort(cache);
      let tempSelectedItems = [...selectedItems].filter(item => {
        return cache.some(cacheItem => cacheItem.path === item.path);
      });
      setSelectedItems(tempSelectedItems);
    }
  }, [cache, sortType, sortOrder]);

  useEffect(() => {
    if (selectedItems.length == 0) setSelectionFlag(0);
    else setSelectionFlag(1);
  }, [selectedItems]);

  const handlePress = item => {
    if (selectionFlag) selectItem(item);
    else useFileHandler(state, dispatch, item);
  };

  const handleLongPress = item => {
    if (selectionFlag) {
      setSelectedItems(useRangeSelect(filesList, [...selectedItems], item));
    } else {
      selectItem(item);
    }
  };

  const handleSort = data => {
    setSortModal(0);
    setFilesList(useSort(data, sortType, sortOrder));
  };

  const selectItem = item => {
    setSelectedItem(item);
    if (selectionFlag) {
      if (
        selectedItems.some(
          selectedItem => selectedItem['path'] === item['path'],
        )
      )
        setSelectedItems(
          selectedItems.filter(
            selectedItem => selectedItem.path !== item['path'],
          ),
        );
      else setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems([item]);
    }
  };

  // const shareFiles = async () => {
  //   try {
  //     let filesToShare = [];
  //     for (let i = 0; i < selectedItems.length; i++) {
  //       if (selectedItems[i].isFile) {
  //         console.log('file://' + selectedItems[i]['path']);
  //         filesToShare.push('file://' + selectedItems[i]['path']);
  //       }
  //     }
  //     await Share.open({
  //       title: 'Share Files',
  //       urls: filesToShare,
  //       failOnCancel: false,
  //     });
  //   } catch (error) {
  //     console.error('Error sharing files: ', error);
  //   }
  // };
  return (
    <View style={{flex: 1}}>
      {Boolean(sortModal) && (
        <SortModal
          sortModal={sortModal}
          sortType={sortType}
          sortOrder={sortOrder}
          setSortModal={setSortModal}
          setSortType={setSortType}
          setSortOrder={setSortOrder}
        />
      )}

      <View style={[styles.wide]}>
        {useMemo(() => {
          return Boolean(state.tabs[props.index]['path'] == 'Home') ? (
            <ScrollView>
              <View style={[styles.padding, styles.bigGap]}>
                {state.cache.map((item, i) => (
                  <Pressable
                    key={i}
                    onPress={() => useFileHandler(state, dispatch, item)}
                    style={[
                      styles.pill,
                      styles.rowLayout,
                      styles.padding,
                      styles.bigGap,
                      {justifyContent: 'flex-start'},
                    ]}>
                    <MaterialIcon name="sd" />
                    <Text style={[styles.text]}>{item['name']}</Text>
                  </Pressable>
                ))}
                <View style={[styles.pill]}>
                  <View
                    style={[styles.rowLayout, styles.bigGap, styles.padding]}>
                    <MaterialIcon name="heart" />
                    <Text style={[styles.text]}>Favourites</Text>
                  </View>
                  <View
                    style={[styles.divider, {backgroundColor: backgroundColor}]}
                  />
                  {state.favouriteItems.length == 0 ? (
                    <Text
                      style={[
                        styles.text,
                        styles.textDisabled,
                        styles.padding,
                      ]}>
                      No items
                    </Text>
                  ) : (
                    state.favouriteItems.map((item, i) => (
                      <Pressable
                        key={i}
                        onPress={() => {
                          dispatch({
                            type: 'UPDATETAB',
                            payload: {
                              tabId: state.currentTab,
                              value: item['path'],
                            },
                          });
                          dispatch({
                            type: 'MODIFYTABNAME',
                            payload: {
                              tabId: state.currentTab,
                              value: item['name'],
                            },
                          });
                        }}
                        style={[
                          styles.rowLayout,
                          styles.bigGap,
                          styles.padding,
                        ]}>
                        <MaterialIcon name="folder" color="#FFC107" />
                        <Text style={[styles.text]}>{item['name']}</Text>
                      </Pressable>
                    ))
                  )}
                </View>
              </View>
            </ScrollView>
          ) : (
            <FilesList
              handlePress={handlePress}
              handleLongPress={handleLongPress}
              setSelectedItems={setSelectedItems}
              setSelectedItem={setSelectedItem}
              finalList={filesList}
              selectedItems={selectedItems}
              selectedItem={selectedItem}
            />
          );
        }, [filesList, selectedItem, selectedItems, selectionFlag])}
      </View>
      <WindowToolBar
        index={props.index}
        selectionFlag={selectionFlag}
        selectedItems={selectedItems}
        filesList={filesList}
        searchModal={searchModal}
        setSelectedItems={setSelectedItems}
        setSelectedItem={setSelectedItem}
        setSortModal={setSortModal}
        setSearchModal={setSearchModal}
        handleSort={handleSort}
      />
      <ToolBar
        selectedItem={selectedItem}
        selectedItems={selectedItems}
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
      />
    </View>
  );
};
export default Window;
