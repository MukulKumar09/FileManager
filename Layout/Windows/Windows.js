import {useSelector} from 'react-redux';
import Window from './Window/Window';
import {useState} from 'react';

function Windows() {
  //remoe view
  const [path, setPath] = useState();
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
            item={state.tabs[index]}
            isActive={state.currentTab == index}
            isRefresh={state.tabs[index]['path'] == path}
            setPath={setPath}
          />
        );
      })}
    </>
  );
}
export default Windows;
