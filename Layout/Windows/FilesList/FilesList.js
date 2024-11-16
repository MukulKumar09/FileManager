import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import navigateItem from '../../../Actions/navigateItem';
import FilesListItem from './FilesListItem/FilesListItem';
import highlightItem from '../../../Actions/highlightItem';
import highlightItemsRange from '../../../Actions/highlightItemsRange';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import DragNDropIcon from '../../DragNDropIcon';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import styles from '../../../styles/styles';

function FilesList({filesList, path, setFilesList, index, addBreadCrumb}) {
  const dispatch = useDispatch();
  const state = {
    dragNDropIcon: useSelector(state => state.dragNDropIcon),
  };
  //shift states to window
  const [selectionFlag, setSelectionFlag] = useState(0);
  const [selectedItems, setSelectedItems] = useState(0);
  const [lastSelectItem, setLastSelectItem] = useState({});
  const [hoveredItem, setHoveredItem] = useState({});
  const [dragNDropIcon, setDragNDropIcon] = useState(0);

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: translationX.value},
      {translateY: translationY.value},
    ],
  }));

  useEffect(() => {
    if (selectedItems == 0) setSelectionFlag(0);
  }, [selectedItems]);

  useEffect(() => {
    setSelectionFlag(0);
    setSelectedItems(0);
  }, [path]);

  const activateDragNDrop = event => {
    const x = event.absoluteX;
    const y = event.absoluteY;
    dispatch({
      type: 'DRAGNDROPICON',
      payload: {
        items: [...filesList.filter(item => item.isHighlighted)],
        droppedCoordinates: {x, y},
      },
    });
  };

  const tap = Gesture.Tap()
    .runOnJS(true)
    .onStart(() => {
      handlePress();
    });
  const longTap = Gesture.LongPress()
    .runOnJS(true)
    .onStart(event => {
      handleLongPress();
      prevTranslationX.value = event.x - 30;
      prevTranslationY.value = event.y - 30;
    });

  const pan = Gesture.Pan()
    .runOnJS(true)
    .activateAfterLongPress(499)
    .onStart(() => {
      console.log('pan started');
      if (hoveredItem.isHighlighted) {
        activateDragNDrop([]);
        setDragNDropIcon(1);
      }
    })
    .onUpdate(event => {
      translationX.value = prevTranslationX.value + event.translationX;
      translationY.value = prevTranslationY.value + event.translationY;
    })
    .onEnd(event => {
      setDragNDropIcon(0);
      activateDragNDrop(event);
    });

  const handlePress = useCallback(() => {
    if (selectionFlag) {
      const selectItems = highlightItem(
        hoveredItem,
        filesList,
        setLastSelectItem,
        setSelectedItems,
      );
      setFilesList(selectItems);
    } else {
      navigateItem(dispatch, index, hoveredItem, addBreadCrumb);
    }
  }, [hoveredItem, index, selectionFlag]);

  const handleLongPress = useCallback(() => {
    if (selectionFlag) {
      const selectItems = highlightItemsRange(
        hoveredItem,
        lastSelectItem,
        filesList,
        setLastSelectItem,
        setSelectedItems,
      );
      setFilesList(selectItems);
    } else {
      setSelectionFlag(1);
      const selectItems = highlightItem(
        hoveredItem,
        filesList,
        setLastSelectItem,
        setSelectedItems,
      );
      setFilesList(selectItems);
    }
  }, [lastSelectItem, hoveredItem, filesList, selectionFlag]);

  return (
    <>
      {/* convert to virtualized list */}
      <Text>{selectedItems}</Text>
      <GestureDetector gesture={Gesture.Exclusive(tap, longTap, pan)}>
        <ScrollView>
          {filesList.map(item => {
            return (
              <FilesListItem
                key={item.path}
                item={item}
                setHoveredItem={setHoveredItem}
                isHighlighted={item.isHighlighted}
                isHovered={hoveredItem == item}
              />
            );
          })}
        </ScrollView>
      </GestureDetector>
      {Boolean(dragNDropIcon) && (
        <Animated.View
          style={[
            styles.pill,
            styles.bordered,
            {
              position: 'absolute',
              zIndex: 10,
              height: 60,
              width: 60,
              pointerEvents: 'none',
              backgroundColor: 'black',
            },
            animatedStyles,
          ]}>
          <DragNDropIcon dragNDropIcon={state.dragNDropIcon} />
        </Animated.View>
      )}
    </>
  );
}
export default React.memo(FilesList);
