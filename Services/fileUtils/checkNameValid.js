import checkExists from '../rnfs/checkExists';

export default async function checkNameValid(value, item, setError) {
  const {destFilePath} = item;
  if (value == '') {
    setError('Please input a value');
    return 0;
  }

  let pattern = /^[\w\-\._~!$&'()*+,;=]*$/;
  let checkName = pattern.test(value);
  if (!checkName) {
    setError('Name cannot contain characters /\\:?*<>');
    return 0;
  }

  const isExists = await checkExists(destFilePath, value);
  if (isExists == true) {
    setError('File already exists!');
    return 0;
  }
  return 1;
}
