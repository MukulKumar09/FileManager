import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import PartGetsConext from "./PartGetsConext";
import { Context } from "./Context";

function App() {

    const [val, setVal] = useState([[0], [0], [0], [0]]);


    const mappedArray = useMemo(() => [1, 2, 3, 4].map((item, indx) => {
        console.log("im the prob")
        const mer =
            useMemo(() =>
                <Context.Provider key={indx} value={{ val, setVal }}>
                    <PartGetsConext indx={indx} />
                </Context.Provider >
                , [val[indx]])
        return (mer)
    }
    ), [1234])
    // Map once


    return (
        <>
            {mappedArray}
            <TouchableOpacity style={{ padding: 20 }} onPress={() => {
                let tempVal = [...val]
                tempVal[0] = [1]
                tempVal[1] = [1]
                tempVal[2] = [1]
                tempVal[3] = [1]
                setVal(tempVal)
            }}>
                <Text>Change</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{ padding: 20 }} onPress={() => {
                let arr = [...val]
                arr[0] = [2]
                setVal(arr)
            }}><Text>Change 0</Text></TouchableOpacity> */}

            {/* <TouchableOpacity style={{ padding: 20 }} onPress={() => {
                let arr = [...val]
                arr[1] = [2]
                setVal(arr)
            }}><Text>Change 1</Text></TouchableOpacity>

            <TouchableOpacity style={{ padding: 20 }} onPress={() => {
                let arr = [...val]
                arr[2] = [2]
                setVal(arr)
            }}><Text>Change 2</Text></TouchableOpacity>

            <TouchableOpacity style={{ padding: 20 }} onPress={() => {
                let arr = [...val]
                arr[3] = [2]
                setVal(arr)
            }}><Text>Change 3</Text></TouchableOpacity> */}
            <TouchableOpacity style={{ padding: 20 }} onPress={() => console.log(val)}><Text>Show Array</Text></TouchableOpacity>
            <TouchableOpacity style={{ padding: 20 }} onPress={() => console.warn("----------")}><Text>Warn</Text></TouchableOpacity>
        </>
    );

}
export default App
