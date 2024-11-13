import {Pressable, Text, View} from 'react-native';
import React from 'react';
import updateBreadCrumbs from '../../../Services/BreadCrumbs/updateBreadCrumbs';
import goBackBreadCrumb from '../../../Services/BreadCrumbs/goBackBreadCrumb';
import styles from '../../../styles/styles';
function BreadCrumbs({breadCrumbs, setBreadCrumbs}) {
  return (
    <View style={[styles.rowLayout]}>
      {breadCrumbs.map((item, i) => {
        return (
          <Pressable
            key={item.path}
            onPress={() => {
              setBreadCrumbs(updateBreadCrumbs(breadCrumbs, i));
            }}>
            <Text>{item.name}</Text>
          </Pressable>
        );
      })}
      <Pressable
        onPress={() => {
          setBreadCrumbs(goBackBreadCrumb(breadCrumbs));
        }}>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
}
export default React.memo(BreadCrumbs);
