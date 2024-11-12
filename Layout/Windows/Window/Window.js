import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import styles from '../../../styles/styles';
import getFilesList from '../../../Services/getFilesList';
import FilesList from '../FilesList/FilesList';
import {useDispatch} from 'react-redux';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';

const Window = React.memo(({index, sort, item, isActive}) => {
  const [filesList, setFilesList] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const [breadCrumbs, setBreadCrumbs] = useState([item]);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(1);
    async function fetchFilesList() {
      const data = await getFilesList(
        breadCrumbs[breadCrumbs.length - 1],
        sort,
      );
      setIsLoading(0);
      setFilesList(data);
    }
    fetchFilesList();
  }, [breadCrumbs]);

  const addBreadCrumb = useCallback(
    item => {
      setBreadCrumbs([...breadCrumbs, item]);
    },
    [breadCrumbs],
  );

  return (
    <View style={[styles.wide, {display: isActive ? 'flex' : 'none'}]}>
      {Boolean(isLoading) && <Text>Loading...{item.name}</Text>}
      <FilesList
        dispatch={dispatch}
        index={index}
        filesList={filesList}
        addBreadCrumb={addBreadCrumb}
      />
      <BreadCrumbs
        dispatch={dispatch}
        index={index}
        breadCrumbs={breadCrumbs}
        setBreadCrumbs={setBreadCrumbs}
      />
    </View>
  );
});
export default Window;
