import collectHighilightedItems from './collectHighilightedItems';

export default function copyToClipboard(dispatch, filesList, type, item) {
  const items = collectHighilightedItems(filesList);
  dispatch({
    type: 'COPYTOCB',
    payload: {type, source: `${item.path}/`, items},
  });
  dispatch({
    type: 'TOAST',
    payload: `${items.length} items added to clipboard.`,
  });
}
