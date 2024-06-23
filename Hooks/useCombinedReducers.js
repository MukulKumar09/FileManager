import ToastReducer from "../Reducers/ToastReducer"
import ClipBoardReducer from "../Reducers/ClipBoardReducer"
import OperationTypeReducer from "../Reducers/OperationTypeReducer";
import OperationDestReducer from "../Reducers/OperationDestReducer";
import OperationSourceReducer from "../Reducers/OperationSourceReducer";
import FunctionIdReducer from "../Reducers/FunctionIDReducer";
import CacheReducer from "../Reducers/CacheReducer";
import CurrentTabReducer from "../Reducers/CurrentTabReducer";
import TabsReducer from "../Reducers/TabsReducer";
import TabCounterReducer from "../Reducers/TabCounterReducer";
import OperationWindowReducer from "../Reducers/OperationWindowReducer";
import InputModalReducer from "../Reducers/InputModalReducer";
import InputPromiseResolveReducer from "../Reducers/InputPromiseResolveReducer";
import ItemExistsModalReducer from "../Reducers/ItemExistsModalReducer";
import ItemExistsDecisionReducer from "../Reducers/ItemExistsDecisionReducer";
import ItemExistsPromiseResolverReducer from "../Reducers/ItemExistsPromiseResolverReducer";
import UpdatedNameReducer from "../Reducers/UpdatedNameReducer";
import ItemInOperationReducer from "../Reducers/ItemInOperationReducer";
import DeleteModalReducer from "../Reducers/DeleteModalReducer";
import DeletePromiseResolverReducer from "../Reducers/DeletePromiseResolverReducer";
import SelectedItemReducer from "../Reducers/SelectedItemReducer";
import MountingPointsReducer from "../Reducers/MountingPointsReducers";
import MediaTypeReducer from "../Reducers/MediaTypeReducer";
import FavouriteItemsReducer from "../Reducers/FavouriteItemsReducer";
import ContextMenuReducer from "../Reducers/ContextMenuReducer";
import FavouritesModalReducer from "../Reducers/FavouritesModalReducer";
import ClipBoardModalReducer from "../Reducers/ClipBoardModalReducer";
import AboutModalReducer from "../Reducers/AboutModalReducer";
export default function useCombinedReducers(state, action) {
    return ({
        mountingPoints: MountingPointsReducer(state.mountingPoints, action),
        cache: CacheReducer(state.cache, action),
        tabs: TabsReducer(state.tabs, action),
        tabCounter: TabCounterReducer(state.tabCounter, action),
        currentTab: CurrentTabReducer(state.currentTab, action),
        clipboardItems: ClipBoardReducer(state.clipboardItems, action),
        selectedItem: SelectedItemReducer(state.selectedItem, action),
        operationType: OperationTypeReducer(state.operationType, action),
        operationSource: OperationSourceReducer(state.operationSource, action),
        operationDest: OperationDestReducer(state.operationDest, action),
        functionId: FunctionIdReducer(state.functionId, action),
        toast: ToastReducer(state.toast, action),
        operationWindow: OperationWindowReducer(state.operationWindow, action),
        inputModal: InputModalReducer(state.inputModal, action),
        inputPromiseResolver: InputPromiseResolveReducer(state.inputPromiseResolver, action),
        deleteModal: DeleteModalReducer(state.deleteModal, action),
        deletePromiseResolver: DeletePromiseResolverReducer(state.deletePromiseResolver, action),
        itemExistsModal: ItemExistsModalReducer(state.itemExistsModal, action),
        itemExistsDecision: ItemExistsDecisionReducer(state.itemExistsDecision, action),
        itemExistsPromiseResolver: ItemExistsPromiseResolverReducer(state.itemExistsPromiseResolver, action),
        updatedName: UpdatedNameReducer(state.updatedName, action),
        itemInOperation: ItemInOperationReducer(state.itemInOperation, action),
        mediaType: MediaTypeReducer(state.mediaType, action),
        favouriteItems: FavouriteItemsReducer(state.favouriteItems, action),
        contextMenu: ContextMenuReducer(state.contextMenu, action),
        favouritesModal: FavouritesModalReducer(state.favouritesModal, action),
        clipBoardModal: ClipBoardModalReducer(state.clipBoardModal, action),
        aboutModal: AboutModalReducer(state.aboutModal, action),
        mediaType: MediaTypeReducer(state.mediaType, action),
    })
}