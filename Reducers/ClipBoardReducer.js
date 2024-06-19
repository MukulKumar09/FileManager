export default function ClipBoardReducer(state, action) {
    switch (action.type) {
        case 'COPYTOCB':
            return action.payload
        case 'DELETECB':
            return [...state].filter((item) => item.path !== action.payload)
        case 'CLEARCB':
            return []
        default:
            return state;

    }
}