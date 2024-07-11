import FileViewer from "react-native-file-viewer";
export default function useOpenExternally(dispatch, item) {
    console.log("file://" + item["path"])
    FileViewer.open(item["path"], { showOpenWithDialog: true }) // absolute-path-to-my-local-file.
        .then(() => {
            // success
        })
        .catch((error) => {
            dispatch({
                type: "UNKNOWNFILETYPEMODAL",
                payload: item
            })
        });
}