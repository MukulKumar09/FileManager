import useOpenExternally from '../Hooks/useOpenExternally';
import generateBCFromPath from '../Services/breadCrumbs/generateBCFromPath';

export default async function navigatePath(
  dispatch,
  index,
  item,
  setBreadCrumbs,
) {
  if (item.type == 'file') {
    useOpenExternally(dispatch, item);
    return;
  }
  setBreadCrumbs(await generateBCFromPath(item.path));
  dispatch({
    type: 'UPDATETAB',
    payload: {
      index,
      item,
    },
  });
}
