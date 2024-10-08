import { combineReducers } from "redux";
import aboutModal from "./aboutModal";
import cache from "./cache";
import clipBoardModal from "./clipBoardModal";
import clipboardItems from "./clipboardItems";
import contextMenu from "./contextMenu";
import currentTab from "./CurrentTabReducer";
import deleteModal from "./DeleteModalReducer";
import deletePromiseResolver from "./DeletePromiseResolverReducer";
import favouriteItems from "./FavouriteItemsReducer";
import favouritesModal from "./FavouritesModalReducer";
import functionId from "./FunctionIDReducer";
import inputModal from "./InputModalReducer";
import inputPromiseResolver from "./InputPromiseResolveReducer";
import itemExistsDecision from "./ItemExistsDecisionReducer";
import itemExistsModal from "./ItemExistsModalReducer";
import itemExistsPromiseResolver from "./ItemExistsPromiseResolverReducer";
import itemInOperation from "./ItemInOperationReducer";
import mediaType from "./MediaTypeReducer";
import mediaBox from "./mediaBox";
import mountingPoints from "./MountingPointsReducers";
import operationDest from "./OperationDestReducer";
import operationSource from "./OperationSourceReducer";
import operationType from "./OperationTypeReducer";
import operationWindow from "./OperationWindowReducer";
import progress from "./ProgressReducer";
import selectedItem from "./SelectedItemReducer";
import tabCounter from "./TabCounterReducer";
import tabs from "./TabsReducer";
import ToastReducer from "./ToastReducer";
import updatedName from "./UpdatedNameReducer";
const rootReducer = combineReducers({
    aboutModal,
    cache,
    clipBoardModal,
    clipboardItems,
    contextMenu,
    currentTab,
    selectedItem,
    deleteModal,
    deletePromiseResolver,
    favouriteItems,
    favouritesModal,
    functionId,
    inputModal,
    inputPromiseResolver,
    itemExistsDecision,
    itemExistsModal,
    itemExistsPromiseResolver,
    itemInOperation,
    mediaBox,
    mediaType,
    mountingPoints,
    operationDest,
    operationSource,
    operationType,
    operationWindow,
    progress,
    selectedItem,
    tabCounter,
    tabs,
    ToastReducer,
    updatedName,
})
export default rootReducer