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
  console.log(isStatic);
  return (
    <Modal
      onRequestClose={isStatic ? undefined : onRequestClose}
      transparent={true}>
      <Pressable
        onPress={isStatic ? undefined : onRequestClose}
        style={[styles.modalBackground]}
      />
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
                {subHeading && <SmallGrayText>{subHeading}</SmallGrayText>}
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
