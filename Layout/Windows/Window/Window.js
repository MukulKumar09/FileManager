import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import styles from '../../../styles/styles';
import FilesList from '../FilesList/FilesList';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import getAndSetFilesList from '../../../Services/getAndSetFilesList';

const Window = React.memo(({index, sort, item, isActive, isRefresh}) => {
  const dispatch = useDispatch();

  const [filesList, setFilesList] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const [breadCrumbs, setBreadCrumbs] = useState([item]);
  const [shouldBeRefreshed, setShouldBeRefreshed] = useState(0);

  const addBreadCrumb = useCallback(
    item => {
      setBreadCrumbs([...breadCrumbs, item]);
    },
    [breadCrumbs],
  );

  useEffect(() => {
    if (isRefresh) {
      if (isActive) {
        //if refresh recieved for current tab, refresh
        getAndSetFilesList(setFilesList, setIsLoading, item, sort);
      } else {
        //otherwise set flag
        setShouldBeRefreshed(1);
      }
    }
  }, [isRefresh]);

  useEffect(() => {
    if (isActive) {
      if (shouldBeRefreshed) {
        //if flag is active, refresh
        getAndSetFilesList(setFilesList, setIsLoading, item, sort);
        setShouldBeRefreshed(0);
      }
    }
  }, [isActive]);

  //retrieve filesList for last breadcrumb
  useEffect(() => {
    const item = breadCrumbs[breadCrumbs.length - 1];
    getAndSetFilesList(setFilesList, setIsLoading, item, sort);
    dispatch({
      type: 'UPDATETAB',
      payload: {
        index,
        item,
      },
    });
  }, [breadCrumbs]);

  return (
    <View style={[styles.wide, {display: isActive ? 'flex' : 'none'}]}>
      {Boolean(isLoading) && <Text>Loading...{item.name}</Text>}
      <FilesList
        index={index}
        path={item.path}
        filesList={filesList}
        setFilesList={setFilesList}
        addBreadCrumb={addBreadCrumb}
      />
      <BreadCrumbs breadCrumbs={breadCrumbs} setBreadCrumbs={setBreadCrumbs} />
      <Pressable
        onPress={() =>
          getAndSetFilesList(setFilesList, setIsLoading, item, sort)
        }>
        <Text>Refresh</Text>
      </Pressable>
    </View>
  );
});
export default Window;
