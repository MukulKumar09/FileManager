import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import About from '../../Layout/Modal/ModalBodies/About';

export default async function handleAbout(dispatch) {
  await modalPromise(
    dispatch,
    About,
    {},
    {
      heading: 'About',
      icon: <MaterialIcon name="coffee-outline" />,
    },
  );
}
