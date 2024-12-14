import React from 'react';
import {Text, Pressable, View} from 'react-native';
import {useDispatch} from 'react-redux';
import styles from '../../styles/styles';
import SmallMaterialIcon from '../SmallMaterialIcon/SmallMaterialIcon';
import Icon from '../../Layout/Icon/Icon';

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
          {overflow: 'hidden'},
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
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.text, styles.oswald, {maxWidth: 100}]}>
            {item.name}
          </Text>
        </Pressable>
        {isActive && (
          <Pressable
            onPress={handleDeleteTab}
            style={[{padding: 15, paddingStart: 0}]}>
            <SmallMaterialIcon name="close" color="#ffffff" />
          </Pressable>
        )}
      </View>
    );
  },
);
export default TabButton;
