import addNewTabFromItem from '../../Actions/addNewTabFromItem';

export default async function handleOpenInNewTab(
  dispatch,
  tabCounter,
  filesList,
) {
  const lastHighlightedItem = {
    ...filesList.find(item => item.isHighlighted),
  };
  if (lastHighlightedItem.type == 'dir') {
    lastHighlightedItem.isCustomItem = true;
    addNewTabFromItem(dispatch, tabCounter, lastHighlightedItem);
  } else {
    dispatch({
      type: 'TOAST',
      payload: 'Only Folders can be opened in New Tab.',
    });
  }
}
