import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles, {backgroundColor} from '../../../styles/styles';
import FilesList from '../FilesList/FilesList';
import getAndSetFilesList from '../../../Services/getAndSetFilesList';
import WindowToolBar from '../WindowToolBar/WindowToolBar';
import ToolBar from '../ToolBar/ToolBar';
import collectHighilightedItems from '../../../Services/collectHighilightedItems';
import copyItems from '../../../Services/Rnfs/copyItems';
import moveItems from '../../../Services/Rnfs/moveItems';
import modalPromise from '../../../Actions/modalPromise';
import Progress from '../../Modal/ModalBodies/Progress';
import MaterialIcon from '../../../Common/MaterialIcon/MaterialIcon';

const Window = React.memo(({index, sort, item, isActive, isRefresh}) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    console.log(option);
    switch (option) {
      case 'copy': {
        const items = collectHighilightedItems(filesList);
        dispatch({
          type: 'COPYTOCB',
          payload: {type: 'copy', items},
        });
        dispatch({
          type: 'TOAST',
          payload: `${items.length} items added to clipboard.`,
        });
        break;
      }
      case 'move': {
        const items = collectHighilightedItems(filesList);
        dispatch({
          type: 'COPYTOCB',
          payload: {type: 'move', items},
        });
        dispatch({
          type: 'TOAST',
          payload: `${items.length} items added to clipboard.`,
        });
        break;
      }
      case 'paste': {
        const operationType = state.clipboardItems.type;
        const paste = async () =>
          await modalPromise(
            dispatch,
            Progress,
            {
              cb: operationType == 'copy' ? copyItems : moveItems,
              arrayOfArgs: [state.clipboardItems.items, item],
            },
            {
              icon: <MaterialIcon name="progress-clock" />,
              heading: `Copy in progress...`,
            },
          );
        paste();
      }
    }
    setOption('');
  }, [option]);

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
        getAndSetFilesList(setIsLoading, item, sort);
        setShouldBeRefreshed(0);
      }
    }
  }, [isActive]);

  //retrieve filesList for last breadcrumb
  useEffect(() => {
    const lastItem = {...breadCrumbs[breadCrumbs.length - 1]};
    async function getSet() {
      setFilesList(await getAndSetFilesList(setIsLoading, lastItem, sort));
      dispatch({
        type: 'UPDATETAB',
        payload: {
          index,
          item: lastItem,
        },
      });
    }
    getSet();
  }, [breadCrumbs]);

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
});
export default Window;
