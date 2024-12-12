export function createConf(realm, dispatch) {
  let confReturn;
  realm.write(() => {
    const conf = realm.objects('conf');

    if (conf.length == 0) {
      realm.create(
        'conf',
        {
          firstRun: 1,
          sort: 'extAscending',
        },
        'modified',
      );
    } else {
      const firstRun = conf[0].firstRun;
      confReturn = {...conf, firstRun};
      if (firstRun) {
        conf[0].firstRun = 0;
      }
    }
    dispatch({
      type: 'SETCONF',
      payload: conf,
    });
  });
  return confReturn;
}
