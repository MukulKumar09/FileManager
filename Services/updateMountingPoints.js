import getMountingPoints from '../Services/getMountingPoints';

export async function updateMountingPoints(realm) {
  //Find all mounting points
  const mountingPoints = await getMountingPoints();

  //Iterate & Insert Mounting points in database
  {
    mountingPoints.forEach(item => {
      realm.write(() => {
        realm.create('cache', item);
      });
    });
  }
}

export function deleteMountingPoints(realm) {
  realm.write(() => {
    const cache = realm.objects('cache').filtered('type == "Home"');
    realm.delete(cache);
  });
}
