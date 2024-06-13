import React, { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

function MyComponent() {
    const [myArr, setMyArr] = useState([1, 2, 3, 4]);
    const prevMyArr = useRef(myArr);

    useEffect(() => {
        // Update the previous value of myArr after each render
        prevMyArr.current = myArr;
    });

    useEffect(() => {
        // This effect will only trigger when the second value of myArr changes
        // Compare the previous value of the second element with the current one
        // using a condition
        if (myArr.length >= 2 && myArr[1] !== prevMyArr.current[1]) {
            // Perform actions here
            console.log('Second value of myArr changed:', myArr[1]);
        }
    }, [myArr]);

    const handleSecondValueChange = (idx, newValue) => {
        const newArr = [...myArr];
        newArr[idx] = newValue;
        setMyArr(newArr);
    };



    return (
        <View>
            {/* Your component's JSX */}
            <TouchableOpacity style={{ padding: 20 }} onPress={() => handleSecondValueChange(1, 10)}><Text>Change Second Value</Text></TouchableOpacity>
            <TouchableOpacity style={{ padding: 20 }} onPress={() => handleSecondValueChange(2, 10)}><Text>Change Second Value</Text></TouchableOpacity>
        </View>
    );
}

export default MyComponent;
