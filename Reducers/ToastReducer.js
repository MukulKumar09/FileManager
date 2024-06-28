import { ToastAndroid } from "react-native";
export default function ToastReducer(state = "", action) {
    if (action.type == "TOAST") {
        ToastAndroid.showWithGravity(
            action.payload,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        )
    }
    return state
}
