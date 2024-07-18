export default function useSort(items, sortType, sortOrder) {
    console.log(sortType, sortOrder)
    switch (sortType) {
        case 0: { //name
            items.sort((a, b) => {
                var x = a["name"].toLowerCase();
                var y = b["name"].toLowerCase();
                if (sortOrder) {
                    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                } else {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                }
            })
            return items
        }
        case 1: { //type
            let allFolders = items.filter(i => i.isDirectory)
            allFolders.sort((a, b) => {
                var x = a["name"].toLowerCase();
                var y = b["name"].toLowerCase();
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            })
            let allFiles = items.filter(i => i.isFile)
            allFiles.sort((a, b) => {
                var x = a["name"].toLowerCase().split(".").pop();
                var y = b["name"].toLowerCase().split(".").pop();
                if (x === y) {
                    return a["name"].localeCompare(b["name"]);
                } else {
                    // Otherwise, sort by extension
                    if (sortOrder) {
                        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                    } else {
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    }
                }
            })
            return [...allFolders, ...allFiles]
        }
        case 2: {
            return filesList
        }
        case 3: {//size
            let allFolders = items.filter(i => i.isDirectory)
            allFolders.sort((a, b) => {
                var x = a["size"];
                var y = b["size"];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            })
            let allFiles = items.filter(i => i.isFile)
            allFiles.sort((a, b) => {
                var x = a["size"];
                var y = b["size"];
                if (sortOrder) {
                    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                } else {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                }
            })
            return [...allFolders, ...allFiles]
        }
    }
}