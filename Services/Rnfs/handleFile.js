import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import ItemExists from '../../Layout/Modal/ModalBodies/ItemExists';
import checkExists from './checkExists';

export default async function handleFile(dispatch, cb, item) {
  const {name, destPath, path} = item;

  try {
    const isItemExists = await checkExists(destPath, name);
    if (isItemExists) {
      console.log('itemexists', item);
      const whatToDo = await modalPromise(
        dispatch,
        ItemExists,
        {item},
        {
          icon: <MaterialIcon name="alert-outline" />,
          heading: `Item Already Exists!`,
          subHeading: `In destination: ${destPath}/${name}`,
        },
      );
      switch (whatToDo) {
        case null:
        case '/skip': {
          return 1;
        }
        case '/overwrite': {
          await cb(path, destPath, name);
          break;
        }
        default: {
          console.log('renamed item');
          await cb(path, destPath, whatToDo);
          break;
        }
      }
    } else {
      await cb(path, destPath, name);
    }
  } catch (error) {
    console.log(error); //if error in cb item
    return 1;
  }
  return 0;
}
