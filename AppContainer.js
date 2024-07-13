import { Provider, } from "react-redux"
import { createStore } from "redux"
import rootReducer from "./Reducers/index";
import App from "./App";
import { StatusBar } from "react-native";
import { backgroundColor } from "./styles";

export default function AppContainer() {
    const store = createStore(rootReducer)
    return (
        <Provider store={store}>

            <StatusBar backgroundColor={backgroundColor} />
            <App />
        </Provider>
    )
}