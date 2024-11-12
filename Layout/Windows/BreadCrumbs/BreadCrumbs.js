import {Pressable, Text, View} from 'react-native';
import React from 'react';
import getStorageName from '../../../Services/getStorageName';
import updateBreadCrumbs from '../../../Services/BreadCrumbs/updateBreadCrumbs';
import goBackBreadCrumb from '../../../Services/BreadCrumbs/goBackBreadCrumb';
import styles from '../../../styles/styles';
function BreadCrumbs({dispatch, index, breadCrumbs, setBreadCrumbs}) {
  return (
    <View style={[styles.rowLayout]}>
      {breadCrumbs.map((item, i) => {
        return (
          <Pressable
            key={item.path}
            onPress={() => {
              setBreadCrumbs(updateBreadCrumbs(breadCrumbs, i));
              dispatch({
                type: 'UPDATETAB',
                payload: {
                  index,
                  item,
                },
              });
            }}>
            <Text>
              {item.name == '' ? getStorageName(item.parent) : item.name}
            </Text>
          </Pressable>
        );
      })}
      <Pressable onPress={() => setBreadCrumbs(goBackBreadCrumb(breadCrumbs))}>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
}
export default React.memo(BreadCrumbs);
