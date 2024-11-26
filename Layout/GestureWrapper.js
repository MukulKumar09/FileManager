import LayoutWrapper from './LayoutWrapper';
import {useSelector, useDispatch} from 'react-redux';
import {Pressable, Text, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import styles from '../styles/styles';
import DragNDropIcon from './DragNDropIcon';
import Tabbar from './Tabs/Tabbar';

export default function GestureWrapper() {
  const dispatch = useDispatch();
  const state = {
    dragNDropIcon: useSelector(state => state.dragNDropIcon),
  };
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .activateAfterLongPress(1000)
    .onStart(() => {
      console.log('pan started');
      dispatch({
        type: 'TOAST',
        payload: 'Drag on a tab to paste',
      });
      translationX.value = state.dragNDropIcon['x'];
      translationY.value = state.dragNDropIcon['y'];
      dispatch({
        type: 'DRAGNDROPICON',
        payload: {
          ...state.dragNDropIcon,
          visible: 1,
        },
      });
    })
    .onUpdate(event => {
      translationX.value = event.absoluteX;
      translationY.value = event.absoluteY;
    })
    .onEnd(event => {
      dispatch({
        type: 'DRAGNDROPICON',
        payload: {
          ...state.dragNDropIcon,
          droppedCoordinates: {x: event.x, y: event.y},
          visible: 0,
        },
      });
    });
  return (
    <>
      <GestureHandlerRootView>
        <GestureDetector gesture={pan}>
          <View style={[styles.wide]}>
            <LayoutWrapper />
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
      <Tabbar translationX={translationX} translationY={translationY} />
    </>
  );
}
