import React from 'react';
import {View, Text} from 'react-native';
import styles, {textColor, secondaryColor} from '../styles/styles';

const DragNDropIcon = ({dragNDropIcon}) => {
  const {items} = dragNDropIcon;
  return (
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
  );
};

export default DragNDropIcon;
