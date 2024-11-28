import {useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useAnimatedStyle} from 'react-native-reanimated';
import styles, {backgroundColor} from '../../styles/styles';
import SmallMaterialIcon from '../../Common/SmallMaterialIcon/SmallMaterialIcon';
import DragNDropIcon from '../DragNDropIcon';
import addNewTab from '../../Actions/addNewTab';
import Tabs from './Tabs/Tabs';

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
    if (state.dragNDropIcon.droppedCoordinates?.y >= tabbarLayout.y)
      Object.keys(tabLayouts).map(tabLayout => {
        const start = tabLayouts[tabLayout].x;
        const end = tabLayouts[tabLayout].xWidth;
        const droppedC =
          state.dragNDropIcon.droppedCoordinates?.x + scrollOffset;
        if (start <= droppedC && droppedC <= end) {
          dispatch({
            type: 'SETCURRENTTAB',
            payload: tabLayout,
          });
        }
      });
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
