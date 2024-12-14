import {View, Text} from 'react-native';
import modalPromise from '../../Actions/modalPromise';
import SmallGrayText from '../../Common/SmallGrayText/SmallGrayText';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import DeleteProgress from '../../Layout/Modal/ModalBodies/DeleteProgress';
import Confirm from '../../Layout/Modal/ModalBodies/Confirm';
import styles from '../../styles/styles';
import Icon from '../../Layout/Icon/Icon';

export default async function handleDelete(dispatch, items) {
  const isConfirmDelete = await modalPromise(
    dispatch,
    Confirm,
    {
      description: (
        <View style={[styles.bigGap]}>
          <Text style={[styles.text]}>
            Do you want to delete these {items.length} items?
          </Text>
          {items.map(item => (
            <View key={item.path} style={[styles.rowLayout, styles.mediumGap]}>
              <Icon item={item} />
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
        items,
      },
      {
        icon: <MaterialIcon name="progress-clock" />,
        heading: `Delete in progress...`,
        isStatic: true,
      },
    );
    dispatch({type: 'TOAST', payload: 'Items deleted.'});
    dispatch({type: 'SETREFRESHPATH', payload: tab.path});
    dispatch({type: 'POPMODALSTACK'});
  }
}
