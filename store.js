import {createStore} from 'redux';

import {combineReducers} from 'redux';
import conf from './Reducers/conf';
import clipboardItems from './Reducers/clipboardItems';
import selectedItem from './Reducers/SelectedItemReducer';
import currentTab from './Reducers/CurrentTabReducer';
import recycleBin from './Reducers/recycleBin';
import favouriteItems from './Reducers/FavouriteItemsReducer';
import media from './Reducers/media';
import tabCounter from './Reducers/TabCounterReducer';
import tabs from './Reducers/TabsReducer';
import ToastReducer from './Reducers/ToastReducer';
import dragNDropIcon from './Reducers/dragNDropIcon';
import modalStack from './Reducers/modalStack';
import refreshPath from './Reducers/refreshPath';

const rootReducer = combineReducers({
  conf,
  clipboardItems,
  selectedItem,
  currentTab,
  recycleBin,
  favouriteItems,
  media,
  tabCounter,
  tabs,
  ToastReducer,
  dragNDropIcon,
  modalStack,
  refreshPath,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
