export default function TestReducer() {
    const animatedWidthStyle = useAnimatedStyle(() => ({
        width: `${progressWidth.value}%`
    })
    )
    const deleteRef = useRef("")
    const progressWidth = useSharedValue(0);
    const height = useSharedValue(0);
    const inputRef = useRef("")
    const clipboardItems = useRef([])
    const operationSource = useRef("")
    const operationDest = useRef("")
    const operationType = useRef(-1)
    const failedItems = useRef([])
    const decisionRef = useRef("")
    const nameNewItem = useRef("")


}
const initialState = {
    mainCache: {},
    clipboardItems: [],
    tabs: {},
    tabCounter: 0,
    currTab: "0",
    funcId: -1,
    breakOperation: 0,
    favouriteItems: [],
    favPaths: [],
    mediaType: 0,
    mediaBox: 0,
    forceRefresh: 0,
    showPaste: 0,
    selectedItem: [],
    alreadyExists: 0,
    progressModal: 0,
    inputModal: 0,
    itemExistsModal: 0,
    favouritesModal: 0,
    clipBoardModal: 0,
    deleteModal: 0,
    aboutModal: 0,
    progress: 0,
    contextMenu: 0,
}
const rootReducer = combineReducers({
    clipboardItems: clipBoardReducer
})
const [state, dispatch] = useReducer(rootReducer, initialState);

const clipBoardReducer = (state, action) => {
    switch (action.type) {
        case 'COPYTOCB':
            return action.payload
        case 'DELETECB':
            return [...state].filter((item) => item.path !== action.payload)
        case 'CLEARCB':
            return []
    }
}

const copyToCB = (selectedItems) => {
    dispatch({
        type: 'COPYTOCB',
        payload: selectedItems
    })
}
const deleteCB = (path) => {
    dispatch({
        type: 'DELETECB',
        payload: path
    })
}
const clearCB = () => {
    dispatch({
        type: 'CLEARCB'
    })
}