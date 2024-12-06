import {Pressable, Text, ScrollView, View} from 'react-native';
import React from 'react';
import updateBreadCrumbs from '../../../Services/breadCrumbs/updateBreadCrumbs';
import goBackBreadCrumb from '../../../Services/breadCrumbs/goBackBreadCrumb';
import styles from '../../../styles/styles';
function BreadCrumbs({breadCrumbs, setBreadCrumbs}) {
  return (
    <>
      <ScrollView
        horizontal={true}
        style={[styles.wide, styles.smallGap, {transform: [{scaleX: -1}]}]}>
        <View
          style={[
            styles.rowLayout,
            styles.smallGap,
            {transform: [{scaleX: -1}]},
          ]}>
          {breadCrumbs.map((item, i) => {
            return (
              <Pressable
                key={item.path}
                onPress={() => {
                  setBreadCrumbs(updateBreadCrumbs(breadCrumbs, i));
                }}
                style={[styles.rowLayout, styles.mediumGap]}>
                <Text
                  style={[
                    styles.smallPill,
                    styles.text,
                    styles.textDisabled,
                    styles.smallText,
                  ]}>
                  {item.name}
                </Text>
                <Text style={[styles.text, styles.textDisabled]}>›</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <Pressable
        onPress={() => {
          setBreadCrumbs(goBackBreadCrumb(breadCrumbs));
        }}
        style={[styles.smallPill, styles.bordered]}>
        <Text style={[styles.text, styles.smallText]}>Back</Text>
      </Pressable>
    </>
  );
}
export default React.memo(BreadCrumbs);
