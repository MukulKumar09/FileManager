import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, { LinearTransition, useSharedValue, withTiming } from 'react-native-reanimated'
import styles from './styles'

export default function Home() {
    const [val, setVal] = useState(0)
    const [hei, sethei] = useState(0)
    const heightAnim = useSharedValue(0)
    return (
        <>
            <Animated.View
                // layout={LinearTransition.duration(1000)}
                style={
                    [
                        {
                            height: heightAnim,
                            backgroundColor: 'white',
                            overflow: 'hidden'
                        }
                    ]
                }>
                <View
                    onLayout={(event) => {
                        console.log(event.nativeEvent.layout.width)
                        heightAnim.value = withTiming(event.nativeEvent.layout.height)
                    }}
                    style={{
                        position: 'absolute',
                        // backgroundColor: 'purple',
                    }}
                >
                    <View style={{
                        padding: 30,
                    }}>
                        <Text style={{ color: 'orange' }}>Text</Text>
                    </View>
                    {val ? <View style={{
                        padding: 30,
                    }}>
                        <Text style={{ color: 'orange' }}>Text</Text>
                    </View> : null}
                </View>
            </Animated.View>
            <Pressable onPress={() => setVal(!val)} style={{ padding: 30 }}><Text>Increase</Text></Pressable>
        </>
    )
}