import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import styles, {backgroundColor} from '../../../styles/styles';
import FilesList from '../FilesList/FilesList';
import WindowToolBar from '../WindowToolBar/WindowToolBar';
import ToolBar from '../ToolBar/ToolBar';
import useHandleOptions from '../../../Hooks/useHandleOptions';
import useBreadCrumb from '../../../Hooks/useBreadCrumb';
import getAndSetFilesList from '../../../Services/cache/getAndSetFilesList';
import SelectedItems from './SelectedItems/SelectedItems';
import useFetchThumbnail from '../../../Hooks/useFetchThumbnail';
import useBackHandler from '../../../Hooks/useBackHandler';
import sortFiles from '../../../Services/fileUtils/sortFiles';
import generateBCFromPath from '../../../Services/breadCrumbs/generateBCFromPath';

const Window = React.memo(({index, sort, item, isActive, isRefresh}) => {
  const dispatch = useDispatch();
  const [filesList, setFilesList] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const [breadCrumbs, setBreadCrumbs] = useState([item]);
  const [shouldBeRefreshed, setShouldBeRefreshed] = useState(0);
  const [option, setOption] = useState('');
  const [selectedItems, setSelectedItems] = useState(0);
  const [searchBar, setSearchBar] = useState(false);

  const pushBreadCrumb = item => {
    if (item.isCustomItem) {
      async function setBCRMBS() {
        const generatedBC = await generateBCFromPath(item.path);
        setBreadCrumbs(generatedBC);
      }
      setBCRMBS();
    } else {
      setBreadCrumbs([...breadCrumbs, item]);
    }
  };

  const refresh = useCallback(
    argItem => {
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
    },
    [item.path],
  );

  useBackHandler(isActive, item, breadCrumbs, setBreadCrumbs);
  useFetchThumbnail(filesList, item, setFilesList);
  useHandleOptions(
    option,
    filesList,
    item,
    setOption,
    setSearchBar,
    refresh,
    pushBreadCrumb,
  );
  useBreadCrumb(breadCrumbs, refresh, index);

  useEffect(() => {
    if (isActive) {
      const sortedFiles = sortFiles(filesList, sort);
      setFilesList([...sortedFiles]);
    }
  }, [sort]);

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
      {Boolean(isLoading) && (
        <Text style={[styles.text]}>Loading...{item.name}</Text>
      )}
      <View style={[styles.wide]}>
        <FilesList
          index={index}
          path={item.path}
          isRefresh={isRefresh}
          filesList={filesList}
          selectedItems={selectedItems}
          refresh={refresh}
          setFilesList={setFilesList}
          setSelectedItems={setSelectedItems}
          pushBreadCrumb={pushBreadCrumb}
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
      {breadCrumbs.length > 1 && (
        <WindowToolBar
          breadCrumbs={breadCrumbs}
          setBreadCrumbs={setBreadCrumbs}
        />
      )}
      <ToolBar
        setOption={setOption}
        isPathHome={item.path == 'Home'}
        selectedItems={selectedItems}
        filesList={filesList}
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        setFilesList={setFilesList}
        refresh={refresh}
        tab={item}
      />
    </View>
  );
});
export default Window;
