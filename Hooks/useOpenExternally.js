import FileViewer from 'react-native-file-viewer';
export default function useOpenExternally(dispatch, item) {
  const {ext, path} = item;
  if (ext == 'apk') {
    dispatch({
      type: 'TOAST',
      payload: 'Installing apk is not supported yet.',
    });
    return;
  }
  FileViewer.open(path, {
    showOpenWithDialog: true,
  }) // absolute-path-to-my-local-file.
    .then(() => {
      // success
    })
    .catch(error => {
      dispatch({
        type: 'TOAST',
        payload: 'No supported apps installed for this file.',
      });
    });
}
