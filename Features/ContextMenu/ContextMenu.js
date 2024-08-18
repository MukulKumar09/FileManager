import {Pressable, ScrollView, View, Modal} from 'react-native';
import styles, {backgroundColor} from '../../styles';
import {useSelector, useDispatch} from 'react-redux';
import useCache from '../../Hooks/useCache';
import MenuItem from '../../Common/MenuItem/MenuItem';
import openInNewTabOperation from '../../Common/Operations/openInNewTabOperation';
import useOpenExternally from '../../Hooks/useOpenExternally';

export default function ContextMenu(props) {
  const state = {
    tabs: useSelector(state => state.tabs),
    currentTab: useSelector(state => state.currentTab),
    tabCounter: useSelector(state => state.tabCounter),
    contextMenu: useSelector(state => state.contextMenu),
  };
  const dispatch = useDispatch();
  const contextMenuHide = () => {
    props.setContextMenu(0);
  };
  return (
    <Modal onRequestClose={() => contextMenuHide()} transparent={true}>
      <Pressable
        onPress={() => contextMenuHide()}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
      <View
        style={[
          styles.pill,
          {
            position: 'absolute',
            bottom: 100,
            right: 10,
            width: 250,
            // top: 0,
            maxHeight: '100%',
            elevation: 10,
            shadowColor: 'black',
          },
        ]}>
        <ScrollView>
          <MenuItem
            functionName={() => {
              if (
                props.selectedItem.length == 0 ||
                props.selectedItem['isDirectory']
              ) {
                dispatch({
                  type: 'TOAST',
                  payload: 'No items selected',
                });
              } else {
                useOpenExternally(dispatch, props.selectedItem);
              }
            }}
            icon="file-move-outline"
            name="Open in another app"
          />
          <MenuItem
            functionName={() => {
              if (
                props.selectedItem.length == 0 ||
                props.selectedItem['isDirectory']
              ) {
                dispatch({
                  type: 'TOAST',
                  payload: 'No items selected',
                });
              } else {
                dispatch({
                  type: 'OPENASMODAL',
                  payload: props.selectedItem,
                });
              }
            }}
            icon="file-question-outline"
            name="Open as"
          />
          <MenuItem
            functionName={() => {
              openInNewTabOperation(state, dispatch, props.selectedItem);
              contextMenuHide();
            }}
            icon="tab-plus"
            name="Open in new tab"
          />
          <View style={[styles.divider, {backgroundColor: backgroundColor}]} />
          <MenuItem
            functionName={() => {
              useCache(dispatch, state.tabs[state.currentTab]['path']);
              contextMenuHide();
            }}
            icon="refresh"
            name="Refresh"
          />
          <MenuItem
            functionName={() =>
              dispatch({
                type: 'CLIPBOARDMODAL',
              })
            }
            icon="clipboard-outline"
            name="Clipboard"
          />
          {/* 
            <View
                style={[
                    styles.rowLayout
                ]}>
                <Pressable
                    style={[
                        styles.rowLayout,
                        styles.bigGap,
                        styles.wide,
                        styles.padding
                    ]}
                    onPressIn={() => { readySet(4, selectedItems) }}
                ><Image source={require('../../assets/archive.png')} />
                    <Text style={[styles.text,styles.wide]}>Archive</Text>
                </Pressable>
            </View>
              */}
          <MenuItem
            functionName={() => {
              dispatch({
                type: 'RECYCLEBINMODAL',
              });
            }}
            icon="delete-empty-outline"
            name="Recycle Bin"
          />
          <MenuItem
            functionName={() => {
              if (props.selectedItems.length == 0) {
                dispatch({
                  type: 'TOAST',
                  payload: 'No items selected',
                });
              } else {
                dispatch({
                  type: 'PROPERTIESMODAL',
                  payload: props.selectedItems,
                });
              }
            }}
            icon="details"
            name="Properties"
          />
          <View style={[styles.divider, {backgroundColor: backgroundColor}]} />
          <MenuItem
            functionName={() =>
              dispatch({
                type: 'ABOUTMODAL',
              })
            }
            icon="coffee-outline"
            name="About"
          />
          <MenuItem
            functionName={() =>
              dispatch({
                type: 'CONTEXTMENU',
              })
            }
            icon="close"
            name="Close"
          />
        </ScrollView>
      </View>
    </Modal>
  );
}
