export default function recycleBin(state = [], action) {
    switch (action.type) {
        case "ADDTORECYCLEBIN": {
            return [...state, ...action.payload]
        }
        case "SETRECYCLEBIN": {
            return action.payload
        }
        case "CLEARRB": {
            return []
        }
    }
    if (action.type == "ADDTORECYCLEBIN")
        return action.payload
    return state
}