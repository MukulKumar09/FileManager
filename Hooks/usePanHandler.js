import {useSelector, useDispatch} from 'react-redux';
import {useSharedValue} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
export default function usePanHandler() {
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
      if (state.dragNDropIcon['isActive']) {
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
      }
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
  return {pan, translationX, translationY};
}
