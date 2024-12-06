import modalPromise from '../Actions/modalPromise';
import MaterialIcon from '../Common/MaterialIcon/MaterialIcon';
import InputValue from '../Layout/Modal/ModalBodies/InputValue';

export default async function askToRename(dispatch, item) {
  let newNameForExistingItem = await modalPromise(
    dispatch,
    InputValue,
    {item},
    {
      icon: <MaterialIcon name="file-edit-outline" />,
      heading: `Enter New Name`,
      subHeading: `For: ${item.name}`,
    },
  );
  if (newNameForExistingItem !== null) {
    dispatch({type: 'POPMODALSTACK'});
    return newNameForExistingItem;
  }
}
