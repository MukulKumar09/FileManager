import MaterialIcon from '../Common/MaterialIcon/MaterialIcon';
import PasteHere from '../Layout/Modal/ModalBodies/PasteHere';
import modalPromise from './modalPromise';
import Progress from '../Layout/Modal/ModalBodies/Progress';
import collectItems from '../Services/rnfs/collectItems';
import copyItem from '../Services/rnfs/copyItem';

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

        const isConfirmPaste = await modalPromise(
          dispatch,
          PasteHere,
          {items: dragNDropIcon.items},
          {
            icon: <MaterialIcon name="content-paste" />,
            heading: `Copy ${dragNDropIcon.items.length} Items here?`,
            subHeading: `To: ${tabs[i].path + '/'}`,
          },
        );
        if (isConfirmPaste == 1) {
          dispatch({type: 'TOAST', payload: 'Copy started'});
          const collectedItems = await collectItems(dragNDropIcon, tabs[i]);
          await modalPromise(
            dispatch,
            Progress,
            {
              items: collectedItems,
              cb: copyItem,
            },
            {
              icon: <MaterialIcon name="progress-clock" />,
              heading: `Copy in progress...`,
              isStatic: true,
            },
          );
          dispatch({type: 'SETREFRESHPATH', payload: tabs[i].path});
        }
        break;
      }
    }
  }
}
