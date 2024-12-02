import {Modal, View, Text, Pressable, ScrollView} from 'react-native';
import styles from '../../styles/styles';
import {memo} from 'react';

function ModalTemplate({heading, onRequestClose, icon, subHeading, children}) {
  return (
    <Modal onRequestClose={onRequestClose} transparent={true}>
      <Pressable onPress={onRequestClose} style={[styles.modalBackground]} />
      <View style={[styles.pill, styles.bigGap, styles.padding, styles.modal]}>
        <View>
          {heading && (
            <View style={[styles.wide, styles.rowLayout, styles.bigGap]}>
              {icon && icon}
              <View style={[styles.wide]}>
                <Text
                  style={[
                    styles.text,
                    styles.wide,
                    styles.headingText,
                    styles.oswald,
                  ]}>
                  {heading}
                </Text>
                {subHeading && (
                  <Text
                    style={[
                      styles.wide,
                      styles.text,
                      styles.textDisabled,
                      styles.smallText,
                    ]}>
                    {subHeading}
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
        <View style={[styles.divider]} />
        <View style={{maxHeight: 500}}>
          <ScrollView>{children}</ScrollView>
        </View>
      </View>
    </Modal>
  );
}
export default memo(ModalTemplate);
