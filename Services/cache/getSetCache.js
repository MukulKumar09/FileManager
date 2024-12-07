import buildCache from '../realm/buildCache';
import validateCache from '../realm/validateCache';
export default async function getSetCache(realm, item) {
  //this sends deepcopy of cache to each request. Because realm invalidates live object
  const {path, mtime} = item;
  console.log(item);
  if (path == 'Home') {
    const realmData = realm.objects('cache').filtered('type == "Home"');
    return realmData;
  }

  function duplicateData(cache) {
    //otherwise all object will reference to realm live objects
    const newCache = cache.map(item => ({...item}));
    return newCache;
  }

  const cache = realm.objects('cache').filtered(`parent == "${path}/"`);

  if (mtime == 'latest') {
    const realmData = await buildCache(realm, path, cache);
    return duplicateData(realmData);
  }
  if (mtime == 'cache') {
    return duplicateData(cache);
  }

  if (cache.length > 0) {
    //if exists, validate
    const cacheValidation = await validateCache(realm, item);
    if (cacheValidation) {
      //if valid, return cache
      console.log('found cache');
      return duplicateData(cache);
    } else {
      //otherwise invalidate older and build new cache
      const realmData = await buildCache(realm, path, cache);
      return duplicateData(realmData);
    }
  } else {
    //if cache doesnt exists, or directory is empty, build cache
    const realmData = await buildCache(realm, path);
    return duplicateData(realmData);
  }
}
