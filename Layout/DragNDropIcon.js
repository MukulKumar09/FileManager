import React, {useRef} from 'react';
import {Animated, View, PanResponder, Text} from 'react-native';
import styles, {textColor, secondaryColor} from '../styles/styles';

const DragNDropIcon = ({dispatch, dragNDropIcon}) => {
  const {coordinates, items} = dragNDropIcon;
  const {pageX, pageY} = coordinates;
  const offset = {x: pageX - 40, y: pageY - 40};

  const animVal = new Animated.ValueXY(offset);
  const pan = useRef(animVal).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        pan.extractOffset();
        return true;
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        dispatch({type: 'DRAGNDROPICON', payload: 0});
        pan.extractOffset();
      },
    }),
  ).current;
  return (
    <View style={{position: 'absolute', flex: 1}}>
      <Animated.View
        style={[
          styles.pill,
          styles.bordered,
          {
            height: 60,
            width: 60,
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          },
        ]}
        {...panResponder.panHandlers}>
        <View
          style={[
            styles.pill,
            styles.whiteBordered,
            styles.centered,
            {
              backgroundColor: secondaryColor,
              position: 'absolute',
              top: 7,
              left: 7,
              height: 60,
              width: 60,
            },
          ]}>
          <Text
            style={{
              color: textColor,
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            {items.length}
          </Text>
          <Text style={[styles.smallText, {color: textColor}]}>items</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default DragNDropIcon;
