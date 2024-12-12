import {useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useAnimatedStyle} from 'react-native-reanimated';
import styles, {backgroundColor} from '../../styles/styles';
import SmallMaterialIcon from '../../Common/SmallMaterialIcon/SmallMaterialIcon';
import DragNDropIcon from '../DragNDropIcon';
import addNewTab from '../../Actions/addNewTab';
import Tabs from './Tabs/Tabs';
import detectDropLocation from '../../Actions/detectDropLocation';

export default function Tabbar({translationX, translationY}) {
  const dispatch = useDispatch();
  const state = {
    tabs: useSelector(state => state.tabs),
    currentTab: useSelector(state => state.currentTab),
    tabCounter: useSelector(state => state.tabCounter),
    dragNDropIcon: useSelector(state => state.dragNDropIcon),
  };

  const [tabbarLayout, setTabbarLayout] = useState({});
  const [tabLayouts, setLayouts] = useState({});
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollTimeoutRef = useRef(null);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: translationX.value},
      {translateY: translationY.value},
    ],
  }));
  useEffect(() => {
    state.dragNDropIcon &&
      detectDropLocation(
        state.tabs,
        state.dragNDropIcon,
        tabbarLayout,
        tabLayouts,
        scrollOffset,
        dispatch,
      );
  }, [state.dragNDropIcon]);

  const handleScroll = useCallback(event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      setScrollOffset(offsetX);
    }, 250);
  }, []);

  return (
    <>
      <View
        onLayout={event => {
          setTabbarLayout(event.nativeEvent.layout);
        }}
        style={[
          styles.rowLayout,
          styles.mediumGap,
          {
            padding: 5,
            backgroundColor,
            justifyContent: 'space-between',
          },
        ]}>
        <Tabs
          tabs={state.tabs}
          currentTab={state.currentTab}
          handleScroll={handleScroll}
          tabLayouts={tabLayouts}
          setLayouts={setLayouts}
        />
        <Pressable
          style={[styles.pill, styles.padding]}
          onPress={() => addNewTab(dispatch, state.tabCounter)}>
          <SmallMaterialIcon name="plus" />
        </Pressable>
      </View>
      {Boolean(state.dragNDropIcon['isActive']) &&
        Boolean(state.dragNDropIcon['visible']) && (
          <DragNDropIcon
            animatedStyles={animatedStyles}
            dragNDropIcon={state.dragNDropIcon}
          />
        )}
    </>
  );
}
