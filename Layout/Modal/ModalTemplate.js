import {Modal, View, Text, Pressable, ScrollView} from 'react-native';
import styles from '../../styles/styles';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import {memo} from 'react';

function ModalTemplate({modalData}) {
  const {onRequestClose, icon, buttons, body, heading, subHeading} = modalData;
  return (
    <Modal onRequestClose={onRequestClose} transparent={true}>
      <Pressable onPress={onRequestClose} style={[styles.modalBackground]} />

      <View style={[styles.pill, styles.bigGap, styles.padding, styles.modal]}>
        <View>
          {heading && (
            <View style={[styles.wide, styles.rowLayout, styles.smallGap]}>
              {icon && <MaterialIcon name={icon} />}
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
          <ScrollView>{body && body()}</ScrollView>
        </View>
        <View style={[styles.rowLayout, styles.mediumGap]}>
          {buttons &&
            buttons.length > 0 &&
            buttons.map((button, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={button.onPress}
                  style={[
                    styles.pill,
                    button.pillHighlight && styles.pillHighlight,
                    button.bordered && styles.bordered,
                    styles.wide,
                    styles.centered,
                    styles.padding,
                    button.style,
                  ]}>
                  <Text style={[styles.text]}>{button.title}</Text>
                </Pressable>
              );
            })}
        </View>
      </View>
    </Modal>
  );
}
export default memo(ModalTemplate);
