import {createStore} from 'redux';

import {combineReducers} from 'redux';
import conf from './Reducers/conf';
import clipboardItems from './Reducers/clipboardItems';
import selectedItem from './Reducers/SelectedItemReducer';
import currentTab from './Reducers/CurrentTabReducer';
import recycleBin from './Reducers/recycleBin';
import favouriteItems from './Reducers/FavouriteItemsReducer';
import mediaType from './Reducers/MediaTypeReducer';
import mediaBox from './Reducers/mediaBox';
import tabCounter from './Reducers/TabCounterReducer';
import tabs from './Reducers/TabsReducer';
import ToastReducer from './Reducers/ToastReducer';
import dragNDropIcon from './Reducers/dragNDropIcon';
import modalStack from './Reducers/modalStack';

const rootReducer = combineReducers({
  conf,
  clipboardItems,
  selectedItem,
  currentTab,
  recycleBin,
  favouriteItems,
  mediaType,
  mediaBox,
  tabCounter,
  tabs,
  ToastReducer,
  dragNDropIcon,
  modalStack,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
