import useOpenExternally from '../Hooks/useOpenExternally';

export default function navigateItem(dispatch, index, item, addBreadCrumb) {
  const {type} = item;

  if (type == 'file') {
    useOpenExternally(dispatch, item);
    return;
  }
  addBreadCrumb(item);
  dispatch({
    type: 'UPDATETAB',
    payload: {
      index,
      item,
    },
  });
}
