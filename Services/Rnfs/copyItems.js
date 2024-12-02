import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import ItemExists from '../../Layout/Modal/ModalBodies/ItemExists';
import progress from '../../Layout/Modal/ModalBodies/progress';
import checkExists from './checkExists';
import collectItems from './collectItems';
import copyItem from './copyItem';

export default async function copyItems(dispatch, items, destTab) {
  // dispatch({
  //   type: 'PUSHMODALSTACK',
  //   payload: progress(dispatch),
  // });
  // dispatch({
  //   type: 'UPDATEPROGRESSMODALSTACK',
  //   payload: progress(dispatch, 'Copying', 'downloads.jpeg', '40%', '89%'),
  // });

  const destDirPath = destTab.item.path;

  const collectedItems = await collectItems(items, destDirPath);
  for (let item of collectedItems) {
    const {destFilePath, name, path} = item;
    try {
      const isItemExists = await checkExists(destFilePath + name);
      if (isItemExists) {
        const whatToDo = await modalPromise(
          dispatch,
          ItemExists,
          {item},
          {
            icon: <MaterialIcon name="alert-outline" />,
            heading: `Item Already Exists!`,
            subHeading: `In Destination: ${item.destFilePath}`,
          },
        );
        switch (whatToDo) {
          case '/<>':
          case '/skip': {
            console.log('skipped item');
            break;
          }
          case '/overwrite': {
            console.log('overwrite write');
            await copyItem(path, destFilePath + name);
            break;
          }
          default: {
            console.log('renamed item');
            await copyItem(path, destFilePath + whatToDo);
            break;
          }
        }
      } else {
        await copyItem(path, destFilePath + name);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return 0;
}
