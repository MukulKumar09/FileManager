import RNFS from 'react-native-fs';
import normalizeTimestamp from './normalizeTimestamp';
import getStorageName from './getStorageName';
export default async function getMountingPoints() {
  //get all mounting points
  try {
    let mountingPoints = await RNFS.getAllExternalFilesDirs();

    //["/storage/emulated/0/Android/data/com.tabber/files", "/storage/9016-4EF8/Android/data/com.tabber/files"]
    //extract base path from these outputs

    for (i in mountingPoints) {
      const path = mountingPoints[i];
      const basePath = path.split('/Android')[0]; //Split at '/Android', take 1 element
      const stat = await RNFS.stat(basePath);
      mountingPoints[i] = {
        name: getStorageName(basePath),
        parent: '',
        path: basePath,
        size: -1,
        type: 'Home',
        ext: '/',
        mtime: normalizeTimestamp(stat.mtime),
      };
    }
    return mountingPoints;
  } catch (error) {
    throw new Error('Error getting Mounting Points', error.message);
  }
}
