import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

export default function useBreadCrumb(breadCrumbs, refresh, index) {
  const dispatch = useDispatch();
  useEffect(() => {
    const lastItem = breadCrumbs[breadCrumbs.length - 1]; //retrieve filesList for last breadcrumb
    refresh(lastItem);
    dispatch({
      type: 'UPDATETAB',
      payload: {
        index,
        item: lastItem,
      },
    });
  }, [breadCrumbs]);
}
