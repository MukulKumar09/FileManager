export default function useBreadCrumbs(state) {
    let path = state.tabs[state.currentTab]["path"]
    if (path == "Home") {
        return []
    } else {
        let obj = []
        let basePath
        let baseName
        for (let i = 0; i < state.cache["Home"].length; i++) {
            if (path.includes(state.cache["Home"][i]["path"])) {
                basePath = state.cache["Home"][i]["path"]
                baseName = state.cache["Home"][i]["name"]
                break
            }
        }
        path = path.replace(basePath, baseName)
        path = path.split("/")
        path.map((i, j) => {
            obj.push({
                "name": i,
                "path": basePath
            })
            basePath = basePath + "/" + path[j + 1]
        })
        console.log(obj)
        return obj
    }
}