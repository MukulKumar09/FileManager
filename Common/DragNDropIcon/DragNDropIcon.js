import React from 'react';
import {View, Text} from 'react-native';
import styles, {textColor, secondaryColor} from '../../styles/styles';
import Animated from 'react-native-reanimated';

const DragNDropIcon = ({animatedStyles, dragNDropIcon}) => {
  const {items} = dragNDropIcon;
  return (
    <Animated.View
      style={[
        styles.pill,
        styles.bordered,
        {
          position: 'absolute',
          zIndex: 10,
          height: 60,
          width: 60,
          marginLeft: -30,
          marginRight: -30,
          marginTop: -100,
          pointerEvents: 'none',
        },
        animatedStyles,
      ]}>
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
          style={[
            styles.oswald,
            {
              color: textColor,
              fontSize: 16,
            },
          ]}>
          {items?.length}
        </Text>
        <Text style={[styles.smallText, {color: textColor}]}>items</Text>
      </View>
    </Animated.View>
  );
};

export default DragNDropIcon;
