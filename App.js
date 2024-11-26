import store from './store';
import GestureWrapper from './Layout/GestureWrapper';
import {Provider} from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <GestureWrapper />
    </Provider>
  );
}
