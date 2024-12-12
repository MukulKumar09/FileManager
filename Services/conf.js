export function createConf(realm, dispatch) {
  let conf;
  realm.write(() => {
    conf = realm.objects('conf')[0];
    if (conf) {
      conf = JSON.parse(JSON.stringify(conf));
      if (conf.firstRun) {
        conf.firstRun = 0;
      }
    } else {
      conf = {
        firstRun: 1,
        sort: {type: 'extension', sort: 'ascending'},
      };
      realm.create('conf', conf, 'modified');
    }
  });
  dispatch({
    type: 'SETCONF',
    payload: conf,
  });
  return conf;
}
