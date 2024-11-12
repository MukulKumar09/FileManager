export const cacheSchema = {
  name: 'cache',
  properties: {
    name: 'string',
    parent: 'string',
    path: 'string',
    size: 'int',
    type: 'string',
    ext: 'string',
    mtime: 'int',
  },
  primaryKey: 'path',
};
