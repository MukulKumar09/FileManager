import addNewTabFromItem from '../../Actions/addNewTabFromItem';

export default async function handleOpenInNewTab(
  dispatch,
  tabCounter,
  filesList,
) {
  const lastHighlightedItem = {
    ...filesList.find(item => item.isHighlighted),
  };
  lastHighlightedItem.isNewTab = true;
  addNewTabFromItem(dispatch, tabCounter, lastHighlightedItem);
}
