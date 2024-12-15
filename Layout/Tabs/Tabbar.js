import {useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useAnimatedStyle} from 'react-native-reanimated';
import styles, {backgroundColor} from '../../styles/styles';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import addNewTab from '../../Actions/addNewTab';
import Tabs from './Tabs/Tabs';
import detectDropLocation from '../../Actions/detectDropLocation';
import DragNDropIcon from '../../Common/DragNDropIcon/DragNDropIcon';

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

  const handleDeleteTab = () => {
    let tempTabs = Object.keys(state.tabs);
    let currentTab = state.currentTab;
    let curTabKey = tempTabs.indexOf(state.currentTab.toString());
    if (tempTabs[curTabKey + 1]) {
      currentTab = tempTabs[curTabKey + 1];
    } else if (tempTabs[curTabKey - 1]) {
      currentTab = tempTabs[curTabKey - 1];
    }
    if (tempTabs.length > 1) {
      dispatch({
        type: 'SETCURRENTTAB',
        payload: currentTab,
      });
      dispatch({
        type: 'DELETETAB',
        payload: state.currentTab,
      });
    }
  };

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
          handleDeleteTab={handleDeleteTab}
          tabLayouts={tabLayouts}
          setLayouts={setLayouts}
        />
        <Pressable
          style={[styles.pill, styles.padding]}
          onPress={() => addNewTab(dispatch, state.tabCounter)}>
          <MaterialIcon name="plus" isSmall={true} />
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
