import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import InputValue from '../../Layout/Modal/ModalBodies/InputValue';
import newFile from '../rnfs/newFile';

export default async function handleNewFile(dispatch, tab) {
  let askNewFileName = await modalPromise(
    dispatch,
    InputValue,
    {item: {name: '', destFilePath: tab.path}},
    {
      icon: <MaterialIcon name="file-edit-outline" />,
      heading: `Enter File Name`,
    },
  );
  if (askNewFileName) {
    await newFile(tab.path, askNewFileName);
    dispatch({type: 'SETREFRESHPATH', payload: tab.path});
  }
  dispatch({type: 'POPMODALSTACK'});
}
