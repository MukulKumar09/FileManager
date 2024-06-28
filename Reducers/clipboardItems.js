export default function clipboardItems(state = [], action) {
    switch (action.type) {
        case 'COPYTOCB': {
            console.log("COPYTOCB called")
            return action.payload
        }
        case 'DELETECB': {
            console.log("DELETECB called")
            return [...state].filter((item) => item.path !== action.payload)
        }
        case 'CLEARCB': {
            console.log("CLEARCB called")
            return []
        }
    }
    return state
}