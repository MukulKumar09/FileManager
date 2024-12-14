import React from 'react';
import {Text, Pressable, View} from 'react-native';
import {useDispatch} from 'react-redux';
import styles from '../../styles/styles';
import SmallMaterialIcon from '../SmallMaterialIcon/SmallMaterialIcon';
import FileItem from '../FileItem/FileItem';

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
          <FileItem item={item} fontStyle={true} />
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
