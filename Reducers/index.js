import { combineReducers } from "redux";
import aboutModal from "./aboutModal";
import cache from "./cache";
import clipBoardModal from "./clipBoardModal";
import clipboardItems from "./clipboardItems";
import selectedItem from "./SelectedItemReducer";
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
import operationDest from "./OperationDestReducer";
import operationSource from "./OperationSourceReducer";
import operationType from "./OperationTypeReducer";
import operationWindow from "./OperationWindowReducer";
import progress from "./ProgressReducer";
import tabCounter from "./TabCounterReducer";
import tabs from "./TabsReducer";
import ToastReducer from "./ToastReducer";
import propertiesModal from "./propertiesModal";
import webBrowserModal from "./webBrowserModal";
import tabsContextMenu from "./tabsContextMenu";
import allTabsModal from "./allTabsModal";
import textEditorModal from "./textEditorModal";
import textEditorUnsavedModal from "./textEditorUnsavedModal";
import textEditorUnsavedPromiseResolver from "./textEditorUnsavedPromiseResolver";
import openAsModal from "./openAsModal";

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
    propertiesModal,
    functionId,
    inputModal,
    inputPromiseResolver,
    itemExistsDecision,
    itemExistsModal,
    itemExistsPromiseResolver,
    itemInOperation,
    mediaBox,
    mediaType,
    operationDest,
    operationSource,
    operationType,
    operationWindow,
    progress,
    selectedItem,
    tabCounter,
    tabs,
    ToastReducer,
    webBrowserModal,
    tabsContextMenu,
    allTabsModal,
    textEditorModal,
    textEditorUnsavedModal,
    textEditorUnsavedPromiseResolver,
    openAsModal
})
export default rootReducer