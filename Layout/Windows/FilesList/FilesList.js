import React from 'react';
import {ScrollView, Pressable, View, Text} from 'react-native';
import HandleItemClick from '../../../Actions/HandleItemClick';

function FilesList({filesList, dispatch, index, addBreadCrumb}) {
  return (
    <ScrollView>
      {filesList.map(item => {
        return (
          <Pressable
            key={item.parent + item.name}
            onPress={() => {
              HandleItemClick(dispatch, index, item, addBreadCrumb);
            }}>
            <Text>{item.name}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
export default React.memo(FilesList);
