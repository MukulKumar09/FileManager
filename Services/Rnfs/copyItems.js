import handleFile from './handleFile';
import copyItem from './copyItem';
export default async function copyItems(dispatch, item, desTab) {
  await handleFile(dispatch, copyItem, item, desTab);
}
