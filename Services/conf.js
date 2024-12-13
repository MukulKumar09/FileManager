import handleAbout from './fileUtils/handleAbout';

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
      handleAbout(dispatch);
      conf = {
        firstRun: 1,
        sort: {type: 'extension', sort: 'ascending'},
        favourites: [],
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
