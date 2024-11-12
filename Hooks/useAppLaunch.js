import realmOpen from '../Services/realm/realmOpen';
import getMountingPoints from '../Services/getMountingPoints';
export default async function useAppLaunch(dispatch) {
  try {
    //Ste 1: Open realm
    const realm = await realmOpen();

    //Step 2: Create/Read
    {
      const conf = realm.objects('conf');
      if (conf.length == 0) {
        realm.write(() => {
          realm.create(
            'conf',
            {
              firstRun: 1,
              sort: 'extAscending',
            },
            'modified',
          );
        });
      }
      dispatch({
        type: 'SETCONF',
        payload: conf,
      });
    }

    //Step 3: Delete existing mounting points
    {
      realm.write(() => {
        const cache = realm.objects('cache').filtered('type == "Home"');
        realm.delete(cache);
      });
    }

    //Step 4: Find all mounting points
    const mountingPoints = await getMountingPoints();

    //Step 5: Iterate & Insert Mounting points in database
    {
      mountingPoints.forEach(path => {
        realm.write(() => {
          realm.create('cache', path);
        });
      });
    }

    //Step 6: Initialize first tab
    {
      dispatch({
        type: 'RESETTABS',
      });
      dispatch({
        type: 'SETCURRENTTAB',
        payload: '0',
      });
      dispatch({
        type: 'INCREASETABCOUNTER',
      });
    }
  } catch (error) {
    dispatch({
      type: 'TOAST',
      payload: error.message,
    });
  }
}
