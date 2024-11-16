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
        style={{
          color: textColor,
          fontSize: 15,
          fontWeight: 'bold',
        }}>
        {items?.length}
      </Text>
      <Text style={[styles.smallText, {color: textColor}]}>items</Text>
    </View>
  );
};

export default DragNDropIcon;
