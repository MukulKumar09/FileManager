export const confSchema = {
  name: 'conf',
  properties: {
    pKey: {type: 'int', default: 1234},
    firstRun: {type: 'int', default: 1},
    sort: 'sort',
    favourites: 'cache[]',
  },
  primaryKey: 'pKey',
};
