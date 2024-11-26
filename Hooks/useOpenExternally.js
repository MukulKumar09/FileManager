import FileViewer from 'react-native-file-viewer';
export default function useOpenExternally(dispatch, item) {
  const {parent, name} = item;
  FileViewer.open(`${parent}${name}`, {showOpenWithDialog: true}) // absolute-path-to-my-local-file.
    .then(() => {
      // success
    })
    .catch(error => {
      dispatch({
        type: 'OPENASMODAL',
        payload: item,
      });
    });
}
