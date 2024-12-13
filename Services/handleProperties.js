import modalPromise from '../Actions/modalPromise';
import MaterialIcon from '../Common/MaterialIcon/MaterialIcon';
import Properties from '../Layout/Modal/ModalBodies/Properties';
import collectHighilightedItems from './collectHighilightedItems';
export default async function handleProperties(dispatch, filesList) {
  const highlightedItems = collectHighilightedItems(filesList);
  if (highlightedItems.length == 0) {
    dispatch({type: 'TOAST', payload: 'No items selected.'});
    return;
  }
  await modalPromise(
    dispatch,
    Properties,
    {items: highlightedItems},
    {
      icon: <MaterialIcon name="details" />,
      heading: `Properties`,
      subHeading: `For ${highlightedItems.length} items`,
    },
  );
}
