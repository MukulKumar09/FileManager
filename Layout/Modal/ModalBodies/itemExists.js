import {Text, View, Pressable} from 'react-native';
import styles from '../../../styles/styles';
import {useDispatch} from 'react-redux';
import DefaultButton from '../../../Common/DefaultButton/DefaultButton';
import SmallGrayText from '../../../Common/SmallGrayText/SmallGrayText';
import askToRename from '../../../Services/askToRename';
import Icon from '../../../Common/Icon/Icon';

const ItemExists = ({resolve, item, onRequestClose}) => {
  console.log(item);
  const dispatch = useDispatch();

  return (
    <View style={[styles.bigGap]}>
      <View
        style={[
          styles.rowLayout,
          styles.mediumGap,
          {alignItems: 'flex-start'},
        ]}>
        <Icon item={item} />
        <View style={[styles.wide]}>
          <Text ellipsizeMode="tail" numberOfLines={5} style={[styles.text]}>
            {item.name}
          </Text>
          <SmallGrayText ellipsizeMode="tail" numberOfLines={5}>
            {item.path}
          </SmallGrayText>
        </View>
      </View>
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <DefaultButton label="Skip" onPress={() => onRequestClose()} />
        <DefaultButton
          label="Overwrite"
          onPress={() => {
            resolve('/overwrite');
            dispatch({type: 'POPMODALSTACK'});
          }}
        />
        <DefaultButton
          isHighlighted={true}
          label="Rename"
          onPress={async () => resolve(askToRename(dispatch, item, resolve))}
        />
      </View>
    </View>
  );
};
export default ItemExists;
