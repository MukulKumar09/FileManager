import handleFile from '../rnfs/handleFile';

export default async function iterateCollectedItems(
  dispatch,
  cb,
  onRequestClose,
  items,
  isRunning,
  setItem,
) {
  totalItems = items['/<>numberOfItems'];
  delete items['/<>numberOfItems'];
  for (let item of Object.keys(items)) {
    if (isRunning.current) {
      if (Array.isArray(items[item])) {
        let isFail = 0;
        for (let folderItem of items[item]) {
          setItem(folderItem);
          isFail += await handleFile(dispatch, cb, folderItem);
        }
        if (isFail == 0) {
          items[item] = 0;
        }
      } else {
        //if item
        setItem(items[item]);
        const isFail = await handleFile(dispatch, cb, items[item]);
        if (isFail == 0) {
          delete items[item];
        }
      }
    } else {
      onRequestClose();
      break;
    }
  }
  onRequestClose();
}
