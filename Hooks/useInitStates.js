export default function useInitStates() {
    return ({
        aboutModal: 0,
        cache: {},
        clipBoardModal: 0,
        clipboardItems: [],
        contextMenu: 0,
        currentTab: 0,
        deleteModal: 0,
        deletePromiseResolver: 0,
        favouriteItems: [],
        favouritesModal: 0,
        functionId: -1,
        inputModal: 0,
        inputPromiseResolver: 0,
        itemExistsDecision: 0,
        itemExistsModal: 0,
        itemExistsPromiseResolver: 0,
        itemInOperation: "",
        mediaBox: 0,
        mediaType: 0,
        mountingPoints: [],
        operationDest: "",
        operationSource: "",
        operationType: -1,
        operationWindow: 0,
        progress: 0,
        selectedItem: [],
        tabCounter: 0,
        tabs: {},
        updatedName: "",

    }
    )
}
