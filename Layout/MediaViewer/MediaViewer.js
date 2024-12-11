import {useDispatch} from 'react-redux';
import {Image, Pressable, Text, View} from 'react-native';
import SmallMaterialIcon from '../../Common/SmallMaterialIcon/SmallMaterialIcon';
import styles, {primaryColor, secondaryColor} from '../../styles/styles';
import Video from 'react-native-video';
export default function MediaViewer({media}) {
  const dispatch = useDispatch();
  const {path, type, name} = media;
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 10,
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
          repeat={true}
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
          <SmallMaterialIcon name="close" color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
}
