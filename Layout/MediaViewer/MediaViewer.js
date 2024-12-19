import {useDispatch} from 'react-redux';
import {Image, Pressable, Text, View} from 'react-native';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import styles, {primaryColor, secondaryColor} from '../../styles/styles';
import Video from 'react-native-video';
import {useState} from 'react';
export default function MediaViewer({media}) {
  const dispatch = useDispatch();
  const [isMaximize, setIsMaximize] = useState(false);
  const {path, type, name} = media;
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 10,
        left: 0,
        right: 0,
        top: 0,
        bottom: isMaximize ? 0 : null,
        backgroundColor: primaryColor,
      }}>
      <View style={[styles.wide, {height: isMaximize ? '100%' : 200}]}>
        {type == 'photo' && (
          <Image
            source={{uri: 'file://' + path}}
            style={[
              styles.wide,
              {
                resizeMode: 'contain',
              },
            ]}
            resizeMode="contain"
          />
        )}
        {(type == 'video' || type == 'audio') && (
          <Video
            onError={e => console.log(e)}
            source={{uri: 'file://' + path}}
            controls={true}
            autoPlay={true}
            style={[
              styles.wide,
              {
                resizeMode: 'contain',
              },
            ]}
          />
        )}
      </View>
      <View
        style={[
          styles.rowLayout,
          {
            backgroundColor: secondaryColor,
            justifyContent: 'space-between',
          },
        ]}>
        <Text
          numberOfLines={2}
          style={[styles.wide, styles.padding, styles.text]}>
          {name}
        </Text>
        <View style={[styles.rowLayout]}>
          <Pressable
            style={[styles.padding]}
            onPress={() => setIsMaximize(prev => !prev)}>
            <MaterialIcon
              name={isMaximize ? 'window-minimize' : 'window-maximize'}
              isSmall={true}
              color="#ffffff"
            />
          </Pressable>
          <Pressable
            style={[styles.padding]}
            onPress={() => dispatch({type: 'SETMEDIA', payload: false})}>
            <MaterialIcon name="close" isSmall={true} color="#ffffff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
