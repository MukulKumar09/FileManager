import { Image, Text } from 'react-native'
import styles, { grey } from '../styles'
import MaterialIcon from '../Common/MaterialIcon/MaterialIcon'

export default function useIcon(item) {
    let ext = ""
    if (item.isFile()) {
        ext = item.name.split(".").pop()
    } else {
        return <MaterialIcon name="folder" color="#FFC107" />
    }
    switch (ext) {
        case "txt":
            return <MaterialIcon name="text-box-outline" />
        case "mp3":
        case "ogg":
        case "wav":
        case "aac": {
            return <MaterialIcon name="music" color="#42A5F5" />
        }
        case "mp4":
        case "avi":
        case "3gp":
        case "wmv":
            return <MaterialIcon name="video-outline" />
        case "apk":
            return <MaterialIcon name="android" color="#A4C639" />
        case "pdf":
            return <MaterialIcon name="file-pdf-box" color="#FF0000" />
        case "zip":
        case "rar":
            return <MaterialIcon name="folder-zip" color="#FFC107" />
        default:
            return (<Text style={[styles.text,
            styles.smallDarkText]}>{ext}</Text>)
    }
}