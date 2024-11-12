import LayoutWrapper from './Layout/LayoutWrapper';
import store from './store';
import {Provider} from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <LayoutWrapper />
    </Provider>
  );
}
