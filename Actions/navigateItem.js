import useOpenExternally from '../Hooks/useOpenExternally';
import generateBCFromPath from '../Services/breadCrumbs/generateBCFromPath';

export default function navigateItem(
  dispatch,
  index,
  item,
  setBreadCrumbs,
  addBreadCrumb,
) {
  const {ext, path, isSearched} = item;

  switch (ext) {
    case '/': {
      if (isSearched) {
        async function fn() {
          setBreadCrumbs(await generateBCFromPath(path));
        }
        fn();
      } else {
        addBreadCrumb(item);
      }
      dispatch({
        type: 'UPDATETAB',
        payload: {
          index,
          item,
        },
      });
      break;
    }
    case 'png':
    case 'jpg':
    case 'jpeg': {
      dispatch({type: 'SETMEDIA', payload: {...item, type: 'photo'}});
      break;
    }
    case 'mp4': {
      dispatch({type: 'SETMEDIA', payload: {...item, type: 'video'}});
      break;
    }
    default: {
      useOpenExternally(dispatch, item);
    }
  }
}
