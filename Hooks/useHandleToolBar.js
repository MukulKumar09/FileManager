import {useEffect} from 'react';
import copyToClipboard from '../Services/copyToClipboard';

import {useDispatch} from 'react-redux';
import startPaste from '../Services/rnfs/startPaste';
import askToRename from '../Services/askToRename';
import moveItem from '../Services/rnfs/moveItem';
import modalPromise from '../Actions/modalPromise';
import Confirm from '../Layout/Modal/ModalBodies/Confirm';
import collectHighilightedItems from '../Services/collectHighilightedItems';
import MaterialIcon from '../Common/MaterialIcon/MaterialIcon';
import {ScrollView, Text, View} from 'react-native';
import styles from '../styles/styles';
import useIcon from './useIcon';
import SmallGrayText from '../Common/SmallGrayText/SmallGrayText';

export default function useHandleToolBar(
  option,
  filesList,
  tab,
  setOption,
  state,
) {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(option);
    switch (option) {
      case 'copy': {
        copyToClipboard(dispatch, filesList, 'copy', tab);
        break;
      }
      case 'move': {
        copyToClipboard(dispatch, filesList, 'move', tab);
        break;
      }
      case 'paste': {
        startPaste(dispatch, state.clipboardItems, {...tab});
        break;
      }
      case 'delete': {
        async function asyncDelete() {
          const highlightedItems = collectHighilightedItems(filesList);
          const isConfirmDelete = await modalPromise(
            dispatch,
            Confirm,
            {
              description: (
                <View style={[styles.bigGap]}>
                  <Text style={[styles.text]}>
                    Do you want to delete these {highlightedItems.length} items?
                  </Text>
                  {highlightedItems.map(item => (
                    <View
                      key={item.path}
                      style={[styles.rowLayout, styles.mediumGap]}>
                      {useIcon(item)}
                      <View style={[styles.wide]}>
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={[styles.text]}>
                          {item.name}
                        </Text>
                        <SmallGrayText ellipsizeMode="tail" numberOfLines={2}>
                          {item.path}
                        </SmallGrayText>
                      </View>
                    </View>
                  ))}
                </View>
              ),
            },
            {
              icon: <MaterialIcon name="delete-outline" />,
              heading: 'Confirm Delete?',
            },
          );
        }
        asyncDelete();
        break;
      }
      case 'rename': {
        async function asyncRename() {
          let lastHighlightedItem = {
            ...filesList.findLast(item => item.isHighlighted),
          };
          const {path, parent} = lastHighlightedItem;
          lastHighlightedItem.destFilePath = parent;
          const newName = await askToRename(dispatch, lastHighlightedItem);
          if (newName) {
            await moveItem(path, parent, newName);
            dispatch({type: 'TOAST', payload: 'Renamed successfully.'});
          }
          dispatch({type: 'SETREFRESHPATH', payload: tab.path});
          dispatch({type: 'POPMODALSTACK'});
        }
        asyncRename();
        break;
      }
    }
    setOption('');
  }, [option]);
}
