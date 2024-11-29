export default function prepareDragNDrop(dispatch, filesList, event) {
  //pan handler will always flip visible flag of dragNDrop icon. isActive flag controls this visibility
  if (!filesList) {
    dispatch({
      type: 'DRAGNDROPICON',
      payload: {
        visible: 0,
        isActive: 0,
      },
    });
    return;
  }
  const {nativeEvent} = event;
  const x = nativeEvent.pageX;
  const y = nativeEvent.pageY;
  dispatch({
    type: 'DRAGNDROPICON',
    payload: {
      visible: 0,
      isActive: 1,
      items: [...filesList.filter(item => item.isHighlighted)],
      x,
      y,
    },
  });
}
