import { Image, Text } from 'react-native'
import styles from '../styles'

export default function useIcon(item) {
    let ext = ""
    if (item.isFile()) {
        ext = item.name.split(".").pop()
    } else {
        return <Image
            style={[styles.imageIcon]}
            source={require('../assets/folder.png')} />
    }
    switch (ext) {
        case "mp3":
            return (<Image
                style={[styles.imageIcon]}
                source={require('../assets/music.png')} />)
        case "exe":
            return (<Image
                style={[styles.imageIcon]}
                source={require('../assets/win.png')} />)
        default:
            return (<Text style={[styles.text,
            styles.smallDarkText]}>{ext}</Text>)
    }
}