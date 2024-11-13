import {Text, Pressable, View, ScrollView, Image} from 'react-native';
import TabButton from '../../Common/TabButton/TabButton';
import styles from '../../styles/styles';
import {useSelector, useDispatch} from 'react-redux';
import Animated, {
  Easing,
  FadeInLeft,
  FadeOutLeft,
  LinearTransition,
} from 'react-native-reanimated';
import SmallMaterialIcon from '../../Common/SmallMaterialIcon/SmallMaterialIcon';
import {useRef, useState} from 'react';

export default function Tabbar() {
  const dispatch = useDispatch();
  const state = {
    tabs: useSelector(state => state.tabs),
    clipboardItems: useSelector(state => state.clipboardItems),
    operationType: useSelector(state => state.operationType),
    currentTab: useSelector(state => state.currentTab),
    tabCounter: useSelector(state => state.tabCounter),
  };
  const scrollViewRef = useRef(0);
  const [position, setPosition] = useState({});
  // useEffect(() => {
  //     scrollViewRef.current.scrollTo({ x: position[state.currentTab] })
  // }, [state.currentTab, position])
  return (
    <View
      style={[
        styles.rowLayout,
        styles.mediumGap,
        {
          paddingTop: 10,
          justifyContent: 'space-between',
        },
      ]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <View style={[styles.rowLayout, styles.mediumGap]}>
          {Object.keys(state.tabs).map(index => {
            return (
              <TabButton
                key={index}
                index={index}
                item={state.tabs[index]['item']}
                isActive={index == state.currentTab}
              />
            );
          })}
        </View>
      </ScrollView>
      <>
        {state.clipboardItems.length > 0 &&
          [0, 1].includes(state.operationType) && (
            <Pressable
              style={[styles.pill, styles.bordered, styles.padding]}
              onPressIn={() => {
                dispatch({
                  type: 'OPERATIONDEST',
                  payload: state.tabs[state.currentTab]['path'],
                });
                dispatch({
                  type: 'OPERATIONWINDOW',
                });
              }}>
              <SmallMaterialIcon name="content-paste" />
            </Pressable>
          )}
        <Pressable
          style={[styles.pill, styles.padding]}
          onPress={() => {
            dispatch({
              type: 'ADDTAB',
              payload: {
                counter: state.tabCounter,
              },
            });
            dispatch({
              type: 'SETCURRENTTAB',
              payload: state.tabCounter,
            });
            dispatch({
              type: 'INCREASETABCOUNTER',
            });
          }}>
          <SmallMaterialIcon name="plus" />
        </Pressable>
      </>
    </View>
  );
}