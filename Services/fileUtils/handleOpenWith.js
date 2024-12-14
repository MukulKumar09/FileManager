import useOpenExternally from '../../Hooks/useOpenExternally';

export default function handleOpenWith(dispatch, filesList) {
  const lastHighlightedItem = {
    ...filesList.find(item => item.isHighlighted),
  };
  if (lastHighlightedItem.type == 'dir') {
    dispatch({
      type: 'TOAST',
      payload: 'Only Files can be opened externally.',
    });
    return;
  }
  useOpenExternally(dispatch, lastHighlightedItem);
}
