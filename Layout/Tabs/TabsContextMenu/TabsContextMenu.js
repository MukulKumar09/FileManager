import {Pressable, View} from 'react-native';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import styles, {backgroundColor} from '../../../styles/styles';
import MenuItem from '../../../Common/MenuItem/MenuItem';

export default function TabsContextMenu() {
  const state = {
    tabs: useSelector(state => state.tabs),
    currentTab: useSelector(state => state.currentTab),
    tabCounter: useSelector(state => state.tabCounter),
  };
  const dispatch = useDispatch();
  return (
    <Animated.View
      entering={FadeInDown.duration(50)}
      exiting={FadeOutDown.duration(50)}
      style={{
        position: 'absolute',
        zIndex: 5,
        height: '100%',
        width: '100%',
      }}>
      <Pressable
        onPressIn={() =>
          dispatch({
            type: 'TABSCONTEXTMENU',
          })
        }
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}></Pressable>
      <View
        style={[
          styles.pill,
          {
            position: 'absolute',
            bottom: 50,
            right: 10,
            width: '60%',
            elevation: 10,
            shadowColor: 'black',
          },
        ]}>
        <MenuItem
          icon="select-all"
          name="All tabs"
          functionName={() =>
            dispatch({
              type: 'ALLTABSMODAL',
            })
          }
        />
        <View style={[styles.divider, {backgroundColor: backgroundColor}]} />
        {/* <MenuItem
                    icon="note-edit-outline"
                    name="New Notes"
                    functionName={() => dispatch({
                        type: "ALLTABSMODAL",
                    })}
                /> */}
        <MenuItem
          icon="tab-plus"
          name="New File Browser"
          functionName={() => {
            dispatch({
              type: 'ADDTAB',
              payload: {
                counter: state.tabCounter,
              },
            });
            dispatch({
              type: 'SETCURRENTTAB',
              payload: state.tabCounter,
            });
            dispatch({
              type: 'INCREASETABCOUNTER',
            });
            dispatch({
              type: 'TABSCONTEXTMENU',
            });
          }}
        />
        <MenuItem
          icon="web"
          name="New Webview"
          functionName={() => {
            dispatch({
              type: 'ADDTAB',
              payload: {
                tabKey: state.tabCounter,
                title: 'Browser',
                path: '',
                type: 'webview',
              },
            });
            dispatch({
              type: 'SETCURRENTTAB',
              payload: state.tabCounter,
            });
            dispatch({
              type: 'INCREASETABCOUNTER',
            });
            dispatch({
              type: 'TABSCONTEXTMENU',
            });
          }}
        />
      </View>
    </Animated.View>
  );
}
