import {NativeModules} from 'react-native';
export default async function getAllFilesFromId(item) {
  const {TabberModule} = NativeModules;
  const {id, mediaType} = item;
  const data = await new Promise(res => {
    TabberModule.getAllFiles(
      parseInt(id) || 0,
      mediaType || null,
      allFiles => {
        allFiles = allFiles.map(file => ({
          ...file,
          mediaType,
        }));
        res(allFiles);
      },
      error => {
        console.error('Error fetching files:', error);
        res([]);
      },
    );
  });
  return data;
}
