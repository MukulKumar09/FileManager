export default function sortFiles(data, sort) {
  if (!Array.isArray(data)) {
    data = Array.from(data);
  }
  switch (sort.type) {
    case 'name': {
      if (sort.sort == 'ascending') {
        data = data.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        data = data.sort((a, b) => b.name.localeCompare(a.name));
      }
      break;
    }
    case 'date': {
      if (sort.sort == 'ascending') {
        data = data.sort((a, b) => a.mtime - b.mtime);
      } else {
        data = data.sort((a, b) => b.mtime - a.mtime);
      }
      break;
    }
    case 'size': {
      if (sort.sort == 'ascending') {
        data = data.sort((a, b) => a.size - b.size);
      } else {
        data = data.sort((a, b) => b.size - a.size);
      }
      break;
    }
    case 'extension': {
      const directories = [
        ...data
          .filter(item => item.ext == '/')
          .sort((a, b) => a.name.localeCompare(b.name)),
      ];
      let files;
      if (sort.sort == 'ascending') {
        files = [
          ...data
            .filter(item => item.ext !== '/')
            .sort((a, b) => a.ext.localeCompare(b.ext)),
        ];
      } else {
        files = [
          ...data
            .filter(item => item.ext !== '/')
            .sort((a, b) => b.ext.localeCompare(a.ext)),
        ];
      }
      data = [...directories, ...files];
      break;
    }
  }

  return data;
}
