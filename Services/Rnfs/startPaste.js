import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import Progress from '../../Layout/Modal/ModalBodies/Progress';
import collectItems from './collectItems';
import copyItem from './copyItem';
import deleteItem from './deleteItem';
import moveItem from './moveItem';

export default async function startPaste(
  dispatch,
  clipboardItems,
  destTab,
  setPath,
) {
  const {source, type} = clipboardItems;
  const isItMove = type == 'move' ? 1 : 0;
  const collectedItems = await collectItems(clipboardItems, destTab);
  // console.log(JSON.stringify(collectedItems, null, 2));
  await modalPromise(
    dispatch,
    Progress,
    {
      items: collectedItems,
      cb: isItMove ? moveItem : copyItem,
    },
    {
      icon: <MaterialIcon name="progress-clock" />,
      heading: `${type} in progress...`,
      isStatic: true,
    },
  );
  if (isItMove) {
    for (let item of Object.keys(collectedItems)) {
      if (collectedItems[item] == 0) {
        await deleteItem(item);
      }
    }
  }
  dispatch({type: 'CLEARCB'});
  setPath(source); //refresh source path
  setTimeout(() => {
    setPath(destTab.path);
  }, 100); //refresh current path
}
