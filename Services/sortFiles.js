export default function sortFiles(data, sort) {
  if (!Array.isArray(data)) {
    data = Array.from(data);
  }

  const sortFunctions = {
    modifiedOldest: (a, b) => a.mtime - b.mtime,
    modifiedNewest: (a, b) => b.mtime - a.mtime,
    nameAscending: (a, b) => a.name.localeCompare(b.name),
    nameDescending: (a, b) => b.name.localeCompare(a.name),
    sizeAscending: (a, b) => a.size - b.size,
    sizeDescending: (a, b) => b.size - a.size,
    extAscending: (a, b) => a.ext.localeCompare(b.ext),
    extDescending: (a, b) => b.ext.localeCompare(a.ext),
  };

  if (sort == 'extAscending') {
    const directories = [
      ...data
        .filter(item => item.ext == '/')
        .sort(sortFunctions['nameAscending']),
    ];
    const files = [
      ...data
        .filter(item => item.ext !== '/')
        .sort(sortFunctions['extAscending']),
    ];
    data = [...directories, ...files];
  } else {
    data = data.sort(sortFunctions[sort]);
  }

  return data;
}
