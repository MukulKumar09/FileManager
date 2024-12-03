import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import ItemExists from '../../Layout/Modal/ModalBodies/ItemExists';
import checkExists from './checkExists';
import collectItems from './collectItems';
import moveItem from './moveItem';

export default async function copyItems(
  dispatch,
  items,
  destTab,
  setItem,
  setItemProgress,
  setTotalProgress,
) {
  dispatch({type: 'TOAST', payload: `Copy started`});
  const destDirPath = destTab.path;

  const collectedItems = await collectItems(items, destDirPath);
  for (let item of collectedItems) {
    setItem(item);
    setItemProgress('0%');
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
            await moveItem(path, destFilePath + name);
            break;
          }
          default: {
            console.log('renamed item');
            await moveItem(path, destFilePath + whatToDo);
            break;
          }
        }
      } else {
        await moveItem(path, destFilePath + name);
      }
      setItemProgress('100%');
    } catch (error) {
      console.log(error);
    }
  }
  dispatch({type: 'TOAST', payload: 'Copy successful.'});
  return 1;
}
