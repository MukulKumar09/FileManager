import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import RecycleBin from '../../Layout/Modal/ModalBodies/RecycleBin';

export default async function handleRecycleBin(dispatch) {
  await modalPromise(
    dispatch,
    RecycleBin,
    {},
    {
      heading: 'Recycle Bin',
      icon: <MaterialIcon name="trash-can-outline" />,
    },
  );
}
