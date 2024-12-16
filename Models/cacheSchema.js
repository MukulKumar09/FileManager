export const cacheSchema = {
  name: 'cache',
  properties: {
    name: 'string',
    path: 'string',
    parent: 'string?',
    id: 'int',
    size: 'int?',
    type: 'string',
    ext: 'string',
    mtime: 'int?',
  },
  primaryKey: 'path',
};
