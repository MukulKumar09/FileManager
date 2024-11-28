export default function prepareDragNDrop(dispatch, filesList, item, event) {
  const {nativeEvent} = event;
  const x = nativeEvent.pageX;
  const y = nativeEvent.pageY;
  dispatch({
    type: 'DRAGNDROPICON',
    payload: {
      visible: 0,
      isActive: item.isHighlighted,
      items: [...filesList.filter(item => item.isHighlighted)],
      x,
      y,
    },
  });
}
