import {Text, Pressable, View, Modal} from 'react-native';
import styles, {backgroundColor} from '../../styles';
import {useSelector, useDispatch} from 'react-redux';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import SmallMaterialIcon from '../../Common/SmallMaterialIcon/SmallMaterialIcon';

export default function AllTabsModal() {
  const dispatch = useDispatch();
  const state = {
    tabs: useSelector(state => state.tabs),
    currentTab: useSelector(state => state.currentTab),
    tabCounter: useSelector(state => state.tabCounter),
  };
  const icon = type => {
    switch (type) {
      case 'filebrowser': {
        return <SmallMaterialIcon name="folder" color="orange" />;
      }
      case 'webview': {
        return <SmallMaterialIcon name="web" color="#4FC3F7" />;
      }
    }
  };

  return (
    <Modal
      onRequestClose={() =>
        dispatch({
          type: 'ALLTABSMODAL',
        })
      }
      transparent={true}>
      <Pressable
        onPress={() =>
          dispatch({
            type: 'ALLTABSMODAL',
          })
        }
        style={[styles.modalBackground]}
      />
      <View
        style={[
          styles.pill,
          styles.modal,
          {
            backgroundColor: backgroundColor,
            position: 'absolute',
            left: 10,
            right: 10,
            bottom: 10,
          },
        ]}>
        <View
          style={[
            styles.rowLayout,
            styles.padding,
            ,
            {
              width: '100%',
              justifyContent: 'space-between',
            },
          ]}>
          <View style={[styles.rowLayout, styles.bigGap]}>
            <MaterialIcon name="select-all" />
            <Text style={[styles.text, styles.headingText]}>All Tabs</Text>
          </View>
          <View style={[styles.rowLayout, styles.bigGap]}>
            <Pressable
              onPress={() => {
                dispatch({
                  type: 'RESETTABS',
                });

                dispatch({
                  type: 'SETCURRENTTAB',
                  payload: '0',
                });
                dispatch({
                  type: 'TABSCONTEXTMENU',
                });
                dispatch({
                  type: 'TOAST',
                  payload: 'Closed all tabs',
                });
              }}>
              <MaterialIcon name="delete-off-outline" color="white" />
            </Pressable>
            <Pressable
              onPress={() => {
                dispatch({
                  type: 'DELETEOTHERTABS',
                  payload: state.currentTab,
                });
                dispatch({
                  type: 'TABSCONTEXTMENU',
                });
                dispatch({
                  type: 'TOAST',
                  payload: 'Closed other tabs',
                });
              }}>
              <MaterialIcon name="delete-sweep-outline" color="white" />
            </Pressable>
          </View>
        </View>
        <View style={{width: '100%'}}>
          <View style={[styles.divider]} />
          <View style={[styles.padding, styles.mediumGap]}>
            {Object.keys(state.tabs).map(index => {
              return (
                <View
                  key={index}
                  style={[
                    styles.rowLayout,
                    styles.pill,
                    index == state.currentTab && styles.pillHighlight,
                  ]}>
                  <Pressable
                    onPress={() => {
                      dispatch({
                        type: 'SETCURRENTTAB',
                        payload: index,
                      });
                    }}
                    style={[
                      styles.rowLayout,
                      styles.padding,
                      styles.wide,
                      styles.bigGap,
                    ]}>
                    {icon(state.tabs[index]['type'])}
                    <Text style={[styles.text]}>
                      {state.tabs[index]['title']}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      let tempTabs = Object.keys(state.tabs);
                      let tabKey = tempTabs.indexOf(
                        state.currentTab.toString(),
                      );
                      let currentTab = state.currentTab;
                      if (tempTabs[tabKey + 1]) {
                        currentTab = tempTabs[tabKey + 1];
                      } else if (tempTabs[tabKey - 1]) {
                        currentTab = tempTabs[tabKey - 1];
                      }
                      if (tempTabs.length > 1) {
                        dispatch({
                          type: 'SETCURRENTTAB',
                          payload: currentTab,
                        });
                        dispatch({
                          type: 'DELETETAB',
                          payload: state.currentTab,
                        });
                      } else {
                        dispatch({
                          type: 'SETCURRENTTAB',
                          payload: '0',
                        });
                        dispatch({
                          type: 'RESETTABS',
                        });
                      }
                    }}
                    style={[styles.padding]}>
                    <MaterialIcon name="close" />
                  </Pressable>
                </View>
              );
            })}
          </View>
          <View style={[styles.divider]} />
        </View>
        <View
          style={[
            styles.padding,
            {
              width: '100%',
            },
          ]}>
          <Pressable
            style={[
              styles.rowLayout,
              styles.pill,
              styles.bigGap,
              styles.padding,
            ]}
            onPress={() => {
              dispatch({
                type: 'ADDTAB',
                payload: {
                  tabKey: state.tabCounter,
                  title: 'Home',
                  path: 'Home',
                  type: 'filebrowser',
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
            }}>
            <MaterialIcon name="folder-plus-outline" />
            <Text style={[styles.text]}>Add New Tab</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
