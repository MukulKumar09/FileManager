import buildCache from '../realm/buildCache';
import validateCache from '../realm/validateCache';
export default async function getSetCache(realm, item) {
  const {path} = item;
  if (path == 'Home') {
    const realmData = realm.objects('cache').filtered('type == "Home"');
    return realmData;
  }
  //check if exists in cache
  // const findOneCache = realm
  //   .objects('cache')
  //   .find(cache => cache.parent == `${path}/`);
  const cache = realm.objects('cache').filtered(`parent == "${path}/"`);

  if (cache.length > 0) {
    //if exists, validate
    const cacheValidation = await validateCache(realm, item);
    if (cacheValidation) {
      //if valid, return cache
      console.log('found cache');
      return cache;
    } else {
      //otherwise invalidate older and build new cache
      const realmData = await buildCache(realm, path, cache);
      return realmData;
    }
  } else {
    //if cache doesnt exists, or directory is empty, build cache
    const realmData = await buildCache(realm, path);
    return realmData;
  }
}
