import useOpenExternally from '../Hooks/useOpenExternally';

export default function navigateItem(dispatch, pushBreadCrumb, index, item) {
  switch (item.ext) {
    case '/': {
      pushBreadCrumb(item);
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
    case 'wav':
    case 'mid':
    case 'ogg':
    case 'mp3': {
      dispatch({type: 'SETMEDIA', payload: {...item, type: 'audio'}});
      break;
    }
    default: {
      useOpenExternally(dispatch, item);
    }
  }
}
