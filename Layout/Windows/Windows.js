import {useSelector} from 'react-redux';
import Window from './Window/Window';
function Windows() {
  const state = {
    tabs: useSelector(state => state.tabs),
    currentTab: useSelector(state => state.currentTab),
    conf: useSelector(state => state.conf),
  };
  return (
    <>
      {Object.keys(state.tabs).map(index => {
        return (
          <Window
            key={index}
            index={index}
            sort={state.conf[0]['sort']}
            item={state.tabs[index]['item']}
            isActive={state.currentTab == index}
          />
        );
      })}
    </>
  );
}
export default Windows;
