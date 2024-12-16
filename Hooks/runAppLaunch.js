import {
  updateMountingPoints,
  deleteMountingPoints,
} from '../Services/cache/updateMountingPoints';
import {createConf} from '../Services/conf';
import realmOpen from '../Services/realm/realmOpen';

export default async function runAppLaunch(dispatch) {
  try {
    //Step 1: Open realm
    const realm = await realmOpen();

    //Step 2: Create/Read Conf
    const conf = createConf(realm, dispatch);

    if (conf.firstRun) {
      //Step * Clear existing mounting points
      deleteMountingPoints(realm);

      //Step 3: Update mounting points
      await updateMountingPoints(realm);
    }

    //Step 4: Initialize first tab
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
    console.log(error);
    dispatch({
      type: 'TOAST',
      payload: error.message,
    });
  }
}
