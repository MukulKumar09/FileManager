export default function useSort(items, sortType, sortOrder) {
  switch (sortType) {
    case 0: {
      //name
      let tempItems = [...items];
      tempItems.sort((a, b) => {
        let x = a?.name?.toLowerCase();
        let y = b?.name?.toLowerCase();
        if (sortOrder) {
          return x < y ? 1 : x > y ? -1 : 0;
        } else {
          return x < y ? -1 : x > y ? 1 : 0;
        }
      });
      return tempItems;
    }
    case 1: {
      //type
      let allFolders = items.filter(i => i.isDirectory);
      allFolders.sort((a, b) => {
        let x = a?.name?.toLowerCase();
        let y = b?.name?.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
      let allFiles = items.filter(i => i.isFile);
      allFiles.sort((a, b) => {
        let x = a?.name?.toLowerCase().split('.').pop();
        let y = b?.name?.toLowerCase().split('.').pop();
        if (x === y) {
          return a?.name?.localeCompare(b.name);
        } else {
          // Otherwise, sort by extension
          if (sortOrder) {
            return x < y ? 1 : x > y ? -1 : 0;
          } else {
            return x < y ? -1 : x > y ? 1 : 0;
          }
        }
      });
      return [...allFolders, ...allFiles];
    }
    case 2: {
      //date
      let tempItems = [...items];
      tempItems.sort((a, b) => {
        let x = new Date(a?.mtime).getTime();
        let y = new Date(b?.mtime).getTime();
        if (sortOrder) {
          return x < y ? 1 : x > y ? -1 : 0;
        } else {
          return x < y ? -1 : x > y ? 1 : 0;
        }
      });
      return tempItems;
    }
    case 3: {
      //size
      let allFolders = items.filter(i => i.isDirectory);
      allFolders.sort((a, b) => {
        let x = a?.name?.toLowerCase();
        let y = b?.name?.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
      let allFiles = items.filter(i => i.isFile);
      allFiles.sort((a, b) => {
        let x = a['size'];
        let y = b['size'];
        if (sortOrder) {
          return x < y ? 1 : x > y ? -1 : 0;
        } else {
          return x < y ? -1 : x > y ? 1 : 0;
        }
      });
      return [...allFolders, ...allFiles];
    }
  }
}
