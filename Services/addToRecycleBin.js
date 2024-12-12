import collectHighilightedItems from './collectHighilightedItems';

export default function addToRecycleBin(dispatch, filesList) {
  const items = collectHighilightedItems(filesList);
  dispatch({
    type: 'ADDTORECYCLEBIN',
    payload: items,
  });
  dispatch({
    type: 'TOAST',
    payload: `${items.length} items added to Recycle Bin.`,
  });
}
