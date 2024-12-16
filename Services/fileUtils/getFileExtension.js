export default function getFileExtension(name) {
  const extension = name.split('.');
  const ext = extension[extension.length - 1];
  return ext ? ext : '/';
}
