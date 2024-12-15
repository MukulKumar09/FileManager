import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import InputValue from '../../Layout/Modal/ModalBodies/InputValue';
import newFolder from '../rnfs/newFolder';

export default async function handleNewFolder(dispatch, tab) {
  let askNewFolderName = await modalPromise(
    dispatch,
    InputValue,
    {item: {name: '', destFilePath: tab.path}},
    {
      icon: <MaterialIcon name="file-edit-outline" />,
      heading: `Enter Folder Name`,
    },
  );
  if (askNewFolderName) {
    await newFolder(tab.path, askNewFolderName);
    dispatch({type: 'SETREFRESHPATH', payload: tab.path});
  }
  dispatch({type: 'POPMODALSTACK'});
}
