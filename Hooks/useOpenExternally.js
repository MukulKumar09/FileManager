import FileViewer from "react-native-file-viewer";
export default function useOpenExternally(item) {
    FileViewer.open(item["path"], { showOpenWithDialog: true }) // absolute-path-to-my-local-file.
        .then(() => {
            // success
        })
        .catch((error) => {
            console.log(error)
            alert('No apps found')
        });
}