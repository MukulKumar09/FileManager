import {Pressable, View, ScrollView, Text} from 'react-native';
import TabButton from '../../Common/TabButton/TabButton';
import styles, {backgroundColor} from '../../styles/styles';
import {useSelector, useDispatch} from 'react-redux';
import SmallMaterialIcon from '../../Common/SmallMaterialIcon/SmallMaterialIcon';
import {useEffect, useRef, useState} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import DragNDropIcon from '../DragNDropIcon';

export default function Tabbar({translationX, translationY}) {
  const dispatch = useDispatch();
  const state = {
    tabs: useSelector(state => state.tabs),
    clipboardItems: useSelector(state => state.clipboardItems),
    operationType: useSelector(state => state.operationType),
    currentTab: useSelector(state => state.currentTab),
    tabCounter: useSelector(state => state.tabCounter),
    dragNDropIcon: useSelector(state => state.dragNDropIcon),
  };
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: translationX.value},
      {translateY: translationY.value},
    ],
  }));

  const [tabbarLayout, setTabbarLayout] = useState({});
  const [tabLayouts, setLayouts] = useState({});
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollTimeoutRef = useRef(null);

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
    // console.log(state.dragNDropIcon['droppedCoordinates']);
  }, [state.dragNDropIcon]);
  // useEffect(() => {
  //     scrollViewRef.current.scrollTo({ x: position[state.currentTab] })
  // }, [state.currentTab, position])

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      setScrollOffset(offsetX);
      // console.log('should fire when stopped');
    }, 250);
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
        <ScrollView
          horizontal={true}
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}>
          <View style={[styles.rowLayout, styles.mediumGap]}>
            {Object.keys(state.tabs).map(index => {
              return (
                <TabButton
                  key={index}
                  index={index}
                  item={state.tabs[index]['item']}
                  isActive={index == state.currentTab}
                  tabLayouts={tabLayouts}
                  setLayouts={setLayouts}
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
      {Boolean(state.dragNDropIcon['visible']) && (
        <Animated.View
          style={[
            styles.pill,
            styles.bordered,
            {
              position: 'absolute',
              zIndex: 10,
              height: 60,
              width: 60,
              marginLeft: -30,
              marginRight: -30,
              marginTop: -100,
              pointerEvents: 'none',
            },
            animatedStyles,
          ]}>
          <DragNDropIcon dragNDropIcon={state.dragNDropIcon} />
        </Animated.View>
      )}
    </>
  );
}
