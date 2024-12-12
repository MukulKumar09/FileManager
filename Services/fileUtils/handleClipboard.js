import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import Clipboard from '../../Layout/Modal/ModalBodies/Clipboard';

export default async function handleClipboard(dispatch) {
  await modalPromise(
    dispatch,
    Clipboard,
    {},
    {
      heading: 'Clipboard',
      icon: <MaterialIcon name="clipboard-outline" />,
    },
  );
}
