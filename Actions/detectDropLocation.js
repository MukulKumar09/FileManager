import pasteHere from '../Layout/Modal/ModalBodies/pasteHere';
import copyItems from '../Services/Rnfs/copyItems';
import modalPromise from './modalPromise';

export default async function detectDropLocation(
  tabs,
  dragNDropIcon,
  tabbarLayout,
  tabLayouts,
  scrollOffset,
  dispatch,
) {
  for (i in tabLayouts) {
    if (dragNDropIcon.droppedCoordinates?.y >= tabbarLayout.y) {
      const start = tabLayouts[i].x;
      const end = tabLayouts[i].xWidth;
      const droppedC = dragNDropIcon.droppedCoordinates?.x + scrollOffset;
      if (start <= droppedC && droppedC <= end) {
        dispatch({
          type: 'SETCURRENTTAB',
          payload: i,
        });
        const modProm = await modalPromise(
          dispatch,
          pasteHere,
          dragNDropIcon.items,
          tabs[i],
        );
        if (modProm) {
          dispatch({type: 'TOAST', payload: 'Copy started'});
          await copyItems(dispatch, dragNDropIcon.items, tabs[i]);
        }
        break;
      }
    }
  }
}
