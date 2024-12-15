import {useDispatch} from 'react-redux';
import {Image, Pressable, Text, View} from 'react-native';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import styles, {primaryColor, secondaryColor} from '../../styles/styles';
import Video from 'react-native-video';
export default function MediaViewer({media}) {
  const dispatch = useDispatch();
  const {path, type, name} = media;
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 10,
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: primaryColor,
      }}>
      {type == 'photo' && (
        <Image
          source={{uri: 'file://' + path}}
          style={[
            {
              height: 200,
              width: '100%',
            },
          ]}
          resizeMode="contain"
        />
      )}
      {type == 'video' && (
        <Video
          source={{uri: 'file://' + path}}
          controls={true}
          autoPlay={true}
          style={[
            {
              height: 200,
              width: '100%',
              resizeMode: 'contain',
            },
          ]}
        />
      )}
      <View
        style={[
          styles.rowLayout,
          {
            backgroundColor: secondaryColor,
            justifyContent: 'space-between',
          },
        ]}>
        <Text style={[styles.padding, styles.text]}>{name}</Text>
        <Pressable
          style={[styles.padding]}
          onPress={() => dispatch({type: 'SETMEDIA', payload: false})}>
          <MaterialIcon name="close" isSmall={true} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
}
