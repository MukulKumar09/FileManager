import {Modal, View, Text, Pressable, ScrollView} from 'react-native';
import styles from '../../styles/styles';
import {memo} from 'react';
import SmallGrayText from '../../Common/SmallGrayText/SmallGrayText';

function ModalTemplate({
  heading,
  isStatic,
  onRequestClose,
  icon,
  subHeading,
  children,
}) {
  return (
    <Modal
      onRequestClose={isStatic ? undefined : onRequestClose}
      transparent={true}>
      <Pressable
        onPress={isStatic ? undefined : onRequestClose}
        style={[styles.modalBackground]}
      />
      <View style={[styles.pill, styles.modal]}>
        <View style={[styles.padding]}>
          {heading && (
            <View style={[styles.wide, styles.rowLayout, styles.mediumGap]}>
              {icon && icon}
              <View style={[styles.wide]}>
                <Text style={[styles.text, styles.headingText, styles.oswald]}>
                  {heading}
                </Text>
                {subHeading && (
                  <SmallGrayText style={styles.wide}>
                    {subHeading}
                  </SmallGrayText>
                )}
              </View>
            </View>
          )}
        </View>
        <View style={[styles.divider]} />
        <View style={[styles.padding, {maxHeight: 500}]}>
          <ScrollView>{children}</ScrollView>
        </View>
      </View>
    </Modal>
  );
}
export default memo(ModalTemplate);
