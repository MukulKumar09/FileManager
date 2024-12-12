import {useEffect} from 'react';
import goBackBreadCrumb from '../Services/breadCrumbs/goBackBreadCrumb';
import {BackHandler} from 'react-native';

export default function useBackHandler(
  isActive,
  item,
  breadCrumbs,
  setBreadCrumbs,
) {
  useEffect(() => {
    if (isActive) {
      const backAction = () => {
        if (breadCrumbs.length > 1) {
          setBreadCrumbs(goBackBreadCrumb(breadCrumbs));
          return true;
        }
        return false;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
  }, [isActive, item, breadCrumbs]);
}
