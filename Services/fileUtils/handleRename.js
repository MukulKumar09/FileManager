import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import InputValue from '../../Layout/Modal/ModalBodies/InputValue';
import moveItem from '../rnfs/moveItem';

export default async function handleRename(dispatch, filesList, tab) {
  let lastHighlightedItem = {
    ...filesList.findLast(item => item.isHighlighted),
  };
  const {path} = lastHighlightedItem;
  lastHighlightedItem.destFilePath = tab.path;
  let newNameForExistingItem = await modalPromise(
    dispatch,
    InputValue,
    {item: lastHighlightedItem},
    {
      icon: <MaterialIcon name="file-edit-outline" />,
      heading: `Enter New Name`,
      subHeading: `For: ${lastHighlightedItem.name}`,
    },
  );
  if (newNameForExistingItem) {
    await moveItem(path, tab.path, newNameForExistingItem);
    dispatch({type: 'TOAST', payload: 'Renamed successfully.'});
    dispatch({type: 'SETREFRESHPATH', payload: tab.path});
  }
  dispatch({type: 'POPMODALSTACK'});
}
