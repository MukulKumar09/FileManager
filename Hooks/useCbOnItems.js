import {useState} from 'react';
import {useDispatch} from 'react-redux';
import handleFile from '../Services/rnfs/handleFile';

export default async function useCbOnItems(
  cb,
  arrayOfArgs,
  setItem,
  setItemProgress,
  setTotalProgress,
) {
  const dispatch = useDispatch();
  const [isCancel, setCancel] = useState(0);
  for (let item of arrayOfArgs[0]) {
    if (!isCancel) {
      await cb(
        dispatch,
        item,
        arrayOfArgs[1],
        setItemProgress,
        setTotalProgress,
      );
    } else {
      break;
    }
  }
  return [setCancel];
}
