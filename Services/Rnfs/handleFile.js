import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import ItemExists from '../../Layout/Modal/ModalBodies/ItemExists';
import checkExists from './checkExists';

export default async function handleFile(
  dispatch,
  cb,
  item,
  path,
  destination,
) {
  let isSuccess = 0;
  const {name} = item;
  try {
    const isItemExists = await checkExists(destination, name);
    if (isItemExists) {
      console.log('itemexists', item);
      const whatToDo = await modalPromise(
        dispatch,
        ItemExists,
        {item},
        {
          icon: <MaterialIcon name="alert-outline" />,
          heading: `Item Already Exists!`,
          subHeading: `In Destination: ${destination}/${name}`,
        },
      );
      switch (whatToDo) {
        case null:
        case '/skip': {
          dispatch({type: 'TOAST', payload: `Skipping ${name}`});
          break;
        }
        case '/overwrite': {
          dispatch({type: 'TOAST', payload: `Overwriting ${name}`});
          await cb(path, destination, name);
          break;
        }
        default: {
          console.log('renamed item');
          await cb(path, destination, whatToDo);
          break;
        }
      }
    } else {
      await cb(path, destination, name);
    }
    isSuccess = 1;
  } catch (error) {
    console.log(error); //if error in cb item
    isSuccess = 0;
  }
  return isSuccess;
}
