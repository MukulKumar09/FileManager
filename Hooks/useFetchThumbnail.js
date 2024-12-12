import {useEffect} from 'react';
import {createThumbnail} from 'react-native-create-thumbnail';

export default function useFetchThumbnail(filesList, tab, setFilesList) {
  useEffect(() => {
    let shouldBreak = 0;
    async function to() {
      for (let i in filesList) {
        const item = filesList[i];
        if (shouldBreak) {
          break;
        }
        switch (item.ext) {
          case 'mp4': {
            await createThumbnail({
              url: `file://${item.path}`,
              timeStamp: 100,
              dirSize: 1000,
              cacheName: btoa(item.path),
              maxHeight: 50,
              maxWidth: 50,
            });
            break;
          }
          case 'png':
          case 'jpeg':
          case 'jpg': {
            console.log('found image');
            break;
          }
        }
      }
    }
    // to();

    return () => {
      shouldBreak = 1;
    };
  }, [tab]);
}
