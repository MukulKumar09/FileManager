import {View, Text} from 'react-native';
import modalPromise from '../../Actions/modalPromise';
import collectHighilightedItems from '../collectHighilightedItems';
import useIcon from '../../Hooks/useIcon';
import SmallGrayText from '../../Common/SmallGrayText/SmallGrayText';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import DeleteProgress from '../../Layout/Modal/ModalBodies/DeleteProgress';
import Confirm from '../../Layout/Modal/ModalBodies/Confirm';
import styles from '../../styles/styles';

export default async function handleDelete(dispatch, filesList, tab) {
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
            <View key={item.path} style={[styles.rowLayout, styles.mediumGap]}>
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
  if (isConfirmDelete) {
    await modalPromise(
      dispatch,
      DeleteProgress,
      {
        items: highlightedItems,
      },
      {
        icon: <MaterialIcon name="progress-clock" />,
        heading: `Delete in progress...`,
        isStatic: true,
      },
    );
    dispatch({type: 'TOAST', payload: 'Items deleted.'});
    dispatch({type: 'SETREFRESHPATH', payload: tab.path});
  }
  dispatch({type: 'POPMODALSTACK'});
}