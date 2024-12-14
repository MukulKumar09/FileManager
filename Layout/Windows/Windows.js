import {lazy, Suspense} from 'react';
import {useSelector} from 'react-redux';
import Window from './Window/Window';
const MediaViewer = lazy(() => import('../MediaViewer/MediaViewer'));
function Windows() {
  //remoe view
  const state = {
    tabs: useSelector(state => state.tabs),
    currentTab: useSelector(state => state.currentTab),
    conf: useSelector(state => state.conf),
    refreshPath: useSelector(state => state.refreshPath),
    media: useSelector(state => state.media),
  };

  return (
    <>
      {Boolean(state.media) && (
        <Suspense>
          <MediaViewer media={state.media} />
        </Suspense>
      )}
      {Object.keys(state.tabs).map(index => {
        return (
          <Window
            key={index}
            index={index}
            sort={state.conf['sort']}
            item={state.tabs[index]}
            isActive={state.currentTab == index}
            isRefresh={state.tabs[index]['path'] == state.refreshPath}
          />
        );
      })}
    </>
  );
}
export default Windows;
