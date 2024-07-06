import { Text, View, ScrollView, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import styles, { secondaryColor } from "../../styles";
import ContextMenu from "../ContextMenu/ContextMenu";
import CircularButton from "../../Common/CircularButton/CircularButton";
import MaterialIcon from "../../Common/MaterialIcon/MaterialIcon";


export default function WebBrowserToolBar(props) {