import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles, {backgroundColor} from '../../../styles/styles';
import FilesList from '../FilesList/FilesList';

import WindowToolBar from '../WindowToolBar/WindowToolBar';
import ToolBar from '../ToolBar/ToolBar';
import useHandleToolBar from '../../../Hooks/useHandleToolBar';
import useBreadCrumb from '../../../Hooks/useBreadCrumb';
import getAndSetFilesList from '../../../Services/cache/getAndSetFilesList';
import SelectedItems from './SelectedItems/SelectedItems';

const Window = React.memo(({index, sort, item, isActive, isRefresh}) => {
  const state = {
    clipboardItems: useSelector(state => state.clipboardItems),
    refreshPath: useSelector(state => state.refreshPath),
  };
  const dispatch = useDispatch();
  const [filesList, setFilesList] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const [breadCrumbs, setBreadCrumbs] = useState([item]);
  const [shouldBeRefreshed, setShouldBeRefreshed] = useState(0);
  const [option, setOption] = useState('');
  const [selectedItems, setSelectedItems] = useState(0);

  const addBreadCrumb = useCallback(
    item => {
      setBreadCrumbs([...breadCrumbs, item]);
    },
    [breadCrumbs],
  );

  function refresh(argItem) {
    if (argItem == 0) {
      //hard refresh same path
      getAndSetFilesList(
        setFilesList,
        setIsLoading,
        {...item, mtime: 'latest'},
        sort,
      );
    } else {
      //navigate to path
      getAndSetFilesList(setFilesList, setIsLoading, argItem, sort);
    }
  }

  useHandleToolBar(option, filesList, item, setOption, state);
  useBreadCrumb(breadCrumbs, refresh, index);

  useEffect(() => {
    if (isRefresh) {
      if (isActive) {
        refresh({...item, mtime: 'latest'}); //refresh if isRefresh received
        dispatch({type: 'SETREFRESHPATH', payload: 0});
      } else {
        setShouldBeRefreshed(1); //otherwise set flag
      }
    }
  }, [isRefresh]);

  useEffect(() => {
    if (isActive) {
      if (shouldBeRefreshed) {
        refresh({...item, mtime: 'latest'}); //refresh on visit if flag is active,
        dispatch({type: 'SETREFRESHPATH', payload: 0});
        setShouldBeRefreshed(0);
      }
    }
  }, [isActive]);
  return (
    <View
      style={[
        styles.wide,
        {backgroundColor, display: isActive ? 'flex' : 'none'},
      ]}>
      {Boolean(isLoading) && <Text>Loading...{item.name}</Text>}

      <View style={[styles.wide]}>
        <FilesList
          index={index}
          path={item.path}
          filesList={filesList}
          refresh={refresh}
          isRefresh={isRefresh}
          setFilesList={setFilesList}
          addBreadCrumb={addBreadCrumb}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </View>
      {Boolean(selectedItems) && (
        <SelectedItems
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          filesList={filesList}
          setFilesList={setFilesList}
        />
      )}

      <WindowToolBar
        breadCrumbs={breadCrumbs}
        setBreadCrumbs={setBreadCrumbs}
      />
      <ToolBar setOption={setOption} isPathHome={item.path == 'Home'} />
    </View>
  );
});
export default Window;
