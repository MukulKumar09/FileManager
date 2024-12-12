import {Realm} from 'realm';
import {cacheSchema} from '../../Models/cacheSchema';
import {confSchema} from '../../Models/confSchema';
import {sortSchema} from '../../Models/sortSchema';

export default async function realmOpen() {
  try {
    const realm = await Realm.open({
      schema: [cacheSchema, confSchema, sortSchema],
      schemaVersion: 0,
    });
    return realm;
  } catch (error) {
    console.log(error);
    return null;
  }
}
