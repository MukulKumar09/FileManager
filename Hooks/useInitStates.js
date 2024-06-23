export default function useInitStates() {
    return ({
        mountingPoints: [],
        cache: {},
        tabs: {},
        tabCounter: 0,
        currentTab: 0,
        clipboardItems: [],
        selectedItem: [],
        operationType: -1,
        operationDest: "",
        operationSource: "",
        functionId: -1,
        operationWindow: 0,
        inputModal: 0,
        inputPromiseResolver: 0,
        deleteModal: 0,
        deletePromiseResolver: 0,
        itemExistsModal: 0,
        itemExistsDecision: 0,
        itemExistsPromiseResolver: 0,
        updatedName: "",
        itemInOperation: "",
        mediaType: 0,
    }
    )
}