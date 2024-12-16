import React from 'react';
import {Text, Pressable, View} from 'react-native';
import {useDispatch} from 'react-redux';
import styles from '../../styles/styles';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import FileItem from '../FileItem/FileItem';
import Icon from '../Icon/Icon';

const TabButton = React.memo(
  ({index, isActive, item, setTabLayout, handleDeleteTab}) => {
    const dispatch = useDispatch();
    return (
      <View
        onLayout={e => {
          const layout = e.nativeEvent.layout;
          setTabLayout({index, layout});
        }}
        style={[
          styles.rowLayout,
          styles.pill,
          isActive && styles.pillHighlight,
          {maxWidth: 200},
        ]}>
        <Pressable
          onPress={() => {
            dispatch({
              type: 'SETCURRENTTAB',
              payload: index,
            });
          }}
          style={[styles.rowLayout, styles.padding, styles.mediumGap]}>
          <Icon item={item} />
          <Text
            ellipsizeMode="tail"
            style={[styles.text, styles.oswald, {maxWidth: 200}]}>
            {item.name}
          </Text>
        </Pressable>
        {isActive && (
          <Pressable
            onPress={handleDeleteTab}
            style={[styles.padding, {padding: 15, paddingStart: 0}]}>
            <MaterialIcon name="close" isSmall={true} color="#ffffff" />
          </Pressable>
        )}
      </View>
    );
  },
);
export default TabButton;
