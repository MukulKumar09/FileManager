import {createStore} from 'redux';

import {combineReducers} from 'redux';
import aboutModal from './Reducers/aboutModal';
import conf from './Reducers/conf';
import clipBoardModal from './Reducers/clipBoardModal';
import clipboardItems from './Reducers/clipboardItems';
import selectedItem from './Reducers/SelectedItemReducer';
import contextMenu from './Reducers/contextMenu';
import currentTab from './Reducers/CurrentTabReducer';
import recycleBin from './Reducers/recycleBin';
import deletePromiseResolver from './Reducers/DeletePromiseResolverReducer';
import favouriteItems from './Reducers/FavouriteItemsReducer';
import favouritesModal from './Reducers/FavouritesModalReducer';
import functionId from './Reducers/FunctionIDReducer';
import inputModal from './Reducers/InputModalReducer';
import inputPromiseResolver from './Reducers/InputPromiseResolveReducer';
import itemExistsDecision from './Reducers/ItemExistsDecisionReducer';
import itemExistsModal from './Reducers/ItemExistsModalReducer';
import itemExistsPromiseResolver from './Reducers/ItemExistsPromiseResolverReducer';
import itemInOperation from './Reducers/ItemInOperationReducer';
import mediaType from './Reducers/MediaTypeReducer';
import mediaBox from './Reducers/mediaBox';
import operationDest from './Reducers/OperationDestReducer';
import operationSource from './Reducers/OperationSourceReducer';
import operationType from './Reducers/OperationTypeReducer';
import operationWindow from './Reducers/OperationWindowReducer';
import progress from './Reducers/ProgressReducer';
import tabCounter from './Reducers/TabCounterReducer';
import tabs from './Reducers/TabsReducer';
import ToastReducer from './Reducers/ToastReducer';
import propertiesModal from './Reducers/propertiesModal';
import webBrowserModal from './Reducers/webBrowserModal';
import dragNDropIcon from './Reducers/dragNDropIcon';
import allTabsModal from './Reducers/allTabsModal';
import textEditorModal from './Reducers/textEditorModal';
import textEditorUnsavedModal from './Reducers/textEditorUnsavedModal';
import textEditorUnsavedPromiseResolver from './Reducers/textEditorUnsavedPromiseResolver';
import openAsModal from './Reducers/openAsModal';
import recycleBinModal from './Reducers/recycleBinModal';
import deleteModal from './Reducers/deleteModal';

const rootReducer = combineReducers({
  aboutModal,
  conf,
  clipBoardModal,
  clipboardItems,
  contextMenu,
  currentTab,
  selectedItem,
  recycleBin,
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
  dragNDropIcon,
  allTabsModal,
  textEditorModal,
  textEditorUnsavedModal,
  textEditorUnsavedPromiseResolver,
  openAsModal,
  recycleBinModal,
  deleteModal,
});

const store = createStore(rootReducer);

export default store;
