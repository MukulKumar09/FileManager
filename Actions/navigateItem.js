import useOpenExternally from '../Hooks/useOpenExternally';

export default function navigateItem(dispatch, index, item, addBreadCrumb) {
  const {type} = item;

  if (type == 'file') {
    useOpenExternally(dispatch, item);
    return;
  }
  addBreadCrumb({...item}); //spread because if, in case, item content changes, it's path can still contribute in navigation. (2 days to fix)
  dispatch({
    type: 'UPDATETAB',
    payload: {
      index,
      item,
    },
  });
}
