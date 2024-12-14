import {Linking, Pressable, Text, View} from 'react-native';
import styles, {grey} from '../../../styles/styles';
import BorderButton from '../../../Common/BorderButton/BorderButton';
import SmallMaterialIcon from '../../../Common/SmallMaterialIcon/SmallMaterialIcon';

export default function About({onRequestClose}) {
  return (
    <View>
      <View>
        <Text style={[styles.text]}>
          {`Thanks for downloading my app!. 
		  \n Hi it's Mukul, I'm an indie dev from India. I'm building this app one step at a time, to make it the best desktop-grade file management solution for mobile devices.
          \n I want to keep it free of any ads/paywalls. However this won't be possible without your support! You can contribute by rating and leaving a feedback on Play Store.`}
        </Text>
        <View
          style={[styles.rowLayout, styles.mediumGap, {paddingVertical: 10}]}>
          <Pressable
            onPress={() => Linking.openURL('mailto:mukulyashi@gmail.com')}
            style={[styles.rowLayout, styles.mediumGap, styles.smallPill]}>
            <SmallMaterialIcon name="gmail" color={grey} />
            <Text style={[styles.text, styles.smallText, styles.textDisabled]}>
              Mail
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              Linking.openURL('https://tabber-privacy-policy.vercel.app/')
            }
            style={[styles.rowLayout, styles.mediumGap, styles.smallPill]}>
            <SmallMaterialIcon name="web" color={grey} />
            <Text style={[styles.text, styles.smallText, styles.textDisabled]}>
              Privacy Policy
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={[styles.rowLayout, styles.mediumGap]}>
        <BorderButton label="Close" onPress={onRequestClose} />
        <BorderButton
          isHighlighted={true}
          label="⭐ Rate"
          onPress={onRequestClose}
        />
      </View>
    </View>
  );
}