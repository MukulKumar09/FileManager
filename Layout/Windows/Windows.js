import {useSelector} from 'react-redux';
import Window from './Window/Window';
import MediaViewer from '../MediaViewer/MediaViewer';

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
      {Boolean(state.media) && <MediaViewer media={state.media} />}
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
