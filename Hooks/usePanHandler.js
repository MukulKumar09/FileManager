import {useDispatch} from 'react-redux';
import {useSharedValue} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
export default function usePanHandler(dragNDropIcon) {
  const dispatch = useDispatch();
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .activateAfterLongPress(1000)
    .onStart(() => {
      dragNDropIcon['shouldBeVisible'] &&
        dispatch({
          type: 'TOAST',
          payload: 'Drag on a tab to paste',
        });
      translationX.value = dragNDropIcon['x'];
      translationY.value = dragNDropIcon['y'];
      dispatch({
        type: 'DRAGNDROPICON',
        payload: {
          ...dragNDropIcon,
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
          ...dragNDropIcon,
          droppedCoordinates: {x: event.x, y: event.y},
          visible: 0,
        },
      });
    });
  return {pan, translationX, translationY};
}
