export function createConf(realm, dispatch) {
  let confReturn;
  realm.write(() => {
    const conf = realm.objects('conf')[0];

    if (conf.length == 0) {
      realm.create(
        'conf',
        {
          firstRun: 1,
          sort: {type: 'extension', sort: 'ascending'},
        },
        'modified',
      );
    } else {
      const firstRun = conf.firstRun;
      confReturn = {...conf, firstRun};
      if (firstRun) {
        conf.firstRun = 0;
      }
    }
    dispatch({
      type: 'SETCONF',
      payload: conf,
    });
  });
  return confReturn;
}
