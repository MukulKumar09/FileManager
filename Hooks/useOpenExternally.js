import FileViewer from 'react-native-file-viewer';
export default function useOpenExternally(dispatch, item) {
  const {name, ext} = item;
  if (ext == 'apk') {
    dispatch({
      type: 'TOAST',
      payload: 'Installing apk is not supported yet.',
    });
    return;
  }
  FileViewer.open(`${item.parent}${name}`, {
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
