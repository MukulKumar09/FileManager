import modalPromise from '../Actions/modalPromise';
import MaterialIcon from '../Common/MaterialIcon/MaterialIcon';
import ItemExists from '../Layout/Modal/ModalBodies/ItemExists';
import checkExists from './Rnfs/checkExists';

export default async function handleFile(dispatch, cb, destPath, item, path) {
  let isSuccess = 0;
  try {
    const isItemExists = await checkExists(destPath);
    if (isItemExists) {
      const whatToDo = await modalPromise(
        dispatch,
        ItemExists,
        {item},
        {
          icon: <MaterialIcon name="alert-outline" />,
          heading: `Item Already Exists!`,
          subHeading: `In Destination: ${destPath}`,
        },
      );
      switch (whatToDo) {
        case null:
        case '/skip': {
          //if any item is skipped
          console.log('skipped item');
          break;
        }
        case '/overwrite': {
          console.log('overwrite write');
          await cb(path, destPath);
          break;
        }
        default: {
          console.log('renamed item');
          await cb(path, destination + '/' + whatToDo);
          break;
        }
      }
    } else {
      await cb(path, destPath);
    }
    isSuccess = 1;
  } catch (error) {
    console.log(error); //if error in cb item
    isSuccess = 0;
  }
  return isSuccess;
}
