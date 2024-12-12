import collectHighilightedItems from '../Services/collectHighilightedItems';

export default function prepareDragNDrop(dispatch, item, filesList, event) {
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
  const source = item.parent;
  dispatch({
    type: 'DRAGNDROPICON',
    payload: {
      visible: 0,
      isActive: 1,
      items: collectHighilightedItems(filesList),
      source,
      x,
      y,
    },
  });
}
