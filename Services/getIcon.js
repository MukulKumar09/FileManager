import {Text} from 'react-native';
import styles from '../styles/styles';
import MaterialIcon from '../Common/MaterialIcon/MaterialIcon';
import retrieveIcon from './native/retrieveIcon';
export default async function getIcon(item) {
  if (item.useDefaultIcon) {
    return <MaterialIcon name={item.ext} />;
  }
  if (item.type == 'Home') {
    return <MaterialIcon name="sd" />;
  }
  if (item.path == 'Home') {
    return <MaterialIcon name="home" />;
  }

  switch (item.ext) {
    case '/': {
      return <MaterialIcon name="folder" color="orange" />;
    }
    case 'txt':
      return <MaterialIcon name="text-box-outline" color="#ffffff" />;
    case 'html':
      return <MaterialIcon name="web" />;
    case 'mp3':
    case 'ogg':
    case 'wav':
    case 'aac': {
      return <MaterialIcon name="music" color="#42A5F5" />;
    }
    case 'jpeg':
    case 'jpg':
    case 'png':
      return (
        (await retrieveIcon(item, 'image')) || (
          <MaterialIcon name="file-image-outline" />
        )
      );
    case 'mp4':
    case 'avi':
    case '3gp':
    case 'wmv':
      return (
        (await retrieveIcon(item, 'video')) || (
          <MaterialIcon name="file-video-outline" />
        )
      );
    case 'apk':
      return <MaterialIcon name="android" color="#A4C639" />;
    case 'pdf':
      return <MaterialIcon name="file-pdf-box" color="#FF0000" />;
    case 'zip':
    case 'rar':
      return <MaterialIcon name="folder-zip" color="#FFC107" />;
    case 'doc':
    case 'docx': {
      return <MaterialIcon name="file-word-outline" color="#2E5DA1" />;
    }
    case 'ppt': {
      return <MaterialIcon name="file-word-outline" color="#A7361D" />;
    }
    case '': {
      return <MaterialIcon name="file-question-outline" />;
    }
  }
  return (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      style={[
        styles.text,
        styles.oswald,
        styles.smallDarkText,
        {width: 30, textAlign: 'center'},
      ]}>
      {item.ext}
    </Text>
  );
}
