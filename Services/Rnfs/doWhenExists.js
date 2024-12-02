import modalPromise from '../../Actions/modalPromise';
import itemExists from '../../Layout/Modal/ModalBodies/itemExists';
export default async function doWhenExists(dispatch, item) {
  let whatToDo = await modalPromise(dispatch, itemExists, item);
  return whatToDo;
}
