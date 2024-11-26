import {Gesture} from 'react-native-gesture-handler';

export const tapGesture = (handlePress, dispatch, hoveredItem) =>
  Gesture.Tap()
    .runOnJS(true)
    .onStart(() => {
      if (Object.keys(hoveredItem).length == 0)
        dispatch({type: 'TOAST', payload: 'Tap again'});
      else handlePress();
    });
export const longTapGesture = handleLongPress =>
  Gesture.LongPress()
    .runOnJS(true)
    .onStart(event => {
      handleLongPress();
      // prevTranslationX.value = event.x - 30;
      // prevTranslationY.value = event.y - 30;
    })
    .onTouchesMove(event => {
      console.log(
        'long press moves',
        event.allTouches[0].x,
        event.allTouches[0].y,
      );
    });

export const panGesture = (dispatch, dragNDropIcon) =>
  Gesture.Pan()
    .runOnJS(true)
    .activateAfterLongPress(1000)
    .onStart(() => {
      console.log('pan started');
      dispatch({
        type: 'DRAGNDROPICON',
        payload: {
          ...dragNDropIcon,
          visible: 1,
        },
      });
    });
