import {useSelector} from 'react-redux';
import Window from './Window/Window';
import {useState} from 'react';
import {Pressable, Text} from 'react-native';

function Windows() {
  //remoe view
  const state = {
    tabs: useSelector(state => state.tabs),
    currentTab: useSelector(state => state.currentTab),
    conf: useSelector(state => state.conf),
    refreshPath: useSelector(state => state.refreshPath),
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
            isRefresh={state.tabs[index]['path'] == state.refreshPath}
          />
        );
      })}
    </>
  );
}
export default Windows;
