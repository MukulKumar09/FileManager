import getMountingPoints from '../cache/getMountingPoints';
import getStorageName from '../fileUtils/getStorageName';

export default async function generateBCFromPath(path) {
  const mountingPoints = await getMountingPoints();
  const breadCrumb = [];
  let drive;
  let mount;

  mountingPoints.map(mountingPoint => {
    if (path.includes(mountingPoint.path)) {
      drive = mountingPoint.path;
      mount = mountingPoint.path;
    }
  });

  breadCrumb.push({name: 'Home', path: 'Home'});
  const driveCrumb = {name: getStorageName(drive), type: 'Home', path: drive};
  breadCrumb.push(driveCrumb);

  let removeDrive = path.split(drive)[1];
  let directories = removeDrive.split('/');
  directories.shift();

  directories.map(directory => {
    drive += `/${directory}`;
    breadCrumb.push({
      name: directory,
      path: drive,
      size: 0,
      mtime: 'cache',
      type: 'dir',
      ext: '/',
    });
  });
  return breadCrumb;
}
