import { Provider, } from "react-redux"
import { createStore } from "redux"
import rootReducer from "./Reducers/index";
import App from "./App";
export default function AppContainer() {
    const store = createStore(rootReducer)
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}