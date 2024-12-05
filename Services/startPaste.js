import modalPromise from '../Actions/modalPromise';
import MaterialIcon from '../Common/MaterialIcon/MaterialIcon';
import Progress from '../Layout/Modal/ModalBodies/Progress';

import copyItems from './Rnfs/copyItems';
import moveItems from './Rnfs/moveItems';

export default async function startPaste(
  dispatch,
  item,
  clipboardItems,
  setPath,
) {
  const {type} = clipboardItems;
  await modalPromise(
    dispatch,
    Progress,
    {
      cb: type == 'copy' ? copyItems : moveItems,
      arrayOfArgs: [clipboardItems.items, item],
    },
    {
      icon: <MaterialIcon name="progress-clock" />,
      heading: `${type} in progress...`,
      isStatic: true,
    },
  );
  dispatch({type: 'CLEARCB'});
  setPath(clipboardItems.source); //refresh source path
  setTimeout(() => {
    setPath(item.path);
  }, 100); //refresh current path
}
