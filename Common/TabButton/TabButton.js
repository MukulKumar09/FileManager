import React from 'react';
import {ScrollView, Text, Pressable, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Animated, {
  Easing,
  FadeInLeft,
  FadeOutLeft,
  LinearTransition,
} from 'react-native-reanimated';
import styles from '../../styles/styles';
import SmallMaterialIcon from '../SmallMaterialIcon/SmallMaterialIcon';
import useIcon from '../../Hooks/useIcon';
import getStorageName from '../../Services/getStorageName';

const TabButton = React.memo(({index, isActive, item}) => {
  const dispatch = useDispatch();
  return (
    <View
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
        style={[styles.rowLayout, styles.mediumGap, {padding: 15}]}>
        {useIcon()}
        <View style={{maxWidth: 100}}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text]}>
            {item.name}
          </Text>
        </View>
      </Pressable>
      {isActive && (
        <Pressable
          // onPress={() => {
          //   let tempTabs = Object.keys(state.tabs);
          //   let tabKey = tempTabs.indexOf(state.currentTab.toString());
          //   let currentTab = state.currentTab;
          //   if (tempTabs[tabKey + 1]) {
          //     currentTab = tempTabs[tabKey + 1];
          //   } else if (tempTabs[tabKey - 1]) {
          //     currentTab = tempTabs[tabKey - 1];
          //   }
          //   if (tempTabs.length > 1) {
          //     dispatch({
          //       type: 'SETCURRENTTAB',
          //       payload: currentTab,
          //     });
          //     dispatch({
          //       type: 'DELETETAB',
          //       payload: state.currentTab,
          //     });
          //   } else {
          //     dispatch({
          //       type: 'SETCURRENTTAB',
          //       payload: '0',
          //     });
          //     dispatch({
          //       type: 'RESETTABS',
          //     });
          //   }
          // }}
          style={[{padding: 15, paddingStart: 0}]}>
          <SmallMaterialIcon name="close" color="#ffffff" />
        </Pressable>
      )}
    </View>
  );
});
export default TabButton;
