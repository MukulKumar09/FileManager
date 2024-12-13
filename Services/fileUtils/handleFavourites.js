import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import Favourites from '../../Layout/Modal/ModalBodies/Favourites';

export default async function handleFavourites(dispatch, pushBreadCrumb, tab) {
  await modalPromise(
    dispatch,
    Favourites,
    {tab, pushBreadCrumb},
    {
      icon: <MaterialIcon name="heart" color="#FF5252" />,
      heading: `Favourites`,
    },
  );
}
