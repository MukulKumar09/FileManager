import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import styles, {backgroundColor} from '../../../styles/styles';
import FilesList from '../FilesList/FilesList';
import getAndSetFilesList from '../../../Services/getAndSetFilesList';
import WindowToolBar from '../WindowToolBar/WindowToolBar';
import ToolBar from '../ToolBar/ToolBar';
import useHandleToolBar from '../../../Hooks/useHandleToolBar';
import useBreadCrumb from '../../../Hooks/useBreadCrumb';

const Window = React.memo(
  ({index, sort, item, isActive, isRefresh, setPath}) => {
    const state = {clipboardItems: useSelector(state => state.clipboardItems)};
    const [filesList, setFilesList] = useState([]);
    const [isLoading, setIsLoading] = useState(0);
    const [breadCrumbs, setBreadCrumbs] = useState([item]);
    const [shouldBeRefreshed, setShouldBeRefreshed] = useState(0);
    const [option, setOption] = useState('');

    const addBreadCrumb = useCallback(
      item => {
        setBreadCrumbs([...breadCrumbs, item]);
      },
      [breadCrumbs],
    );

    function refresh(argItem) {
      if (argItem == 0) {
        //hard refresh
        getAndSetFilesList(
          setFilesList,
          setIsLoading,
          {...item, mtime: 'latest'},
          sort,
        );
      } else {
        getAndSetFilesList(setFilesList, setIsLoading, argItem, sort);
      }
    }

    useHandleToolBar(option, filesList, item, setOption, setPath, state);
    useBreadCrumb(breadCrumbs, refresh, index);

    useEffect(() => {
      if (isRefresh) {
        if (isActive) {
          refresh({...item, mtime: 'latest'}); //refresh if isRefresh received
          setPath('');
        } else {
          setShouldBeRefreshed(1); //otherwise set flag
        }
      }
    }, [isRefresh]);

    useEffect(() => {
      if (isActive) {
        if (shouldBeRefreshed) {
          refresh({...item, mtime: 'latest'}); //refresh on visit if flag is active,
          setPath('');
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
            setFilesList={setFilesList}
            addBreadCrumb={addBreadCrumb}
          />
        </View>
        <WindowToolBar
          breadCrumbs={breadCrumbs}
          setBreadCrumbs={setBreadCrumbs}
        />
        <ToolBar setOption={setOption} isPathHome={item.path == 'Home'} />
      </View>
    );
  },
);
export default Window;
