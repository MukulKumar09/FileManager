export default function getFileExtension(name) {
  const extension = name.split('.');
  return extension[extension.length - 1];
}
