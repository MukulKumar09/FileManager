import useOpenExternally from '../Hooks/useOpenExternally';

export default function navigateItem(dispatch, index, item, addBreadCrumb) {
  const {parent, name, type} = item;
  if (type == 'file') {
    useOpenExternally(dispatch, `${parent}${name}`);
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
