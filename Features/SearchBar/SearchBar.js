import {Text, View, Pressable, TextInput, Modal} from 'react-native';
import {useState} from 'react';
import Animated, {FadeInLeft, FadeOutLeft} from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import styles, {backgroundColor, grey} from '../../styles';
import SmallMaterialIcon from '../../Common/SmallMaterialIcon/SmallMaterialIcon';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';

export default function SearchBar() {
  const dispatch = useDispatch();
  const state = {
    contextMenu: useSelector(state => state.contextMenu),
    tabs: useSelector(state => state.tabs),
    currentTab: useSelector(state => state.currentTab),
  };
  const [text, setText] = useState(state.tabs[state.currentTab]['path']);
  const [type, setType] = useState(state.tabs[state.currentTab]['type']);
  const [typeModal, setTypeModal] = useState(0);
  return (
    <Animated.View
      entering={FadeInLeft.duration(50)}
      exiting={FadeOutLeft.duration(50)}
      style={[
        styles.pill,
        styles.rowLayout,
        styles.bordered,
        {
          position: 'absolute',
          zIndex: 1,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      ]}>
      {Boolean(typeModal) && (
        <Modal transparent={true}>
          <Pressable
            onPress={() => setTypeModal(0)}
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
            <View style={{width: '100%'}}>
              <Pressable
                onPress={() => {
                  setType('search');
                  setTypeModal(0);
                }}
                style={[
                  styles.rowLayout,
                  styles.wide,
                  styles.bigGap,
                  styles.padding,
                ]}>
                <MaterialIcon name="magnify" />
                <Text style={[styles.text]}>Files Search</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setType('webbrowser');
                  setTypeModal(0);
                }}
                style={[
                  styles.rowLayout,
                  styles.wide,
                  styles.bigGap,
                  styles.padding,
                ]}>
                <MaterialIcon name="web" color="#4FC3F7" />
                <Text style={[styles.text]}>Web Search</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setType('filebrowser');
                  setTypeModal(0);
                }}
                style={[
                  styles.rowLayout,
                  styles.wide,
                  styles.bigGap,
                  styles.padding,
                ]}>
                <MaterialIcon name="folder" color="#FFC107" />
                <Text style={[styles.text]}>Path</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      <Pressable
        onPress={() => {
          dispatch({
            type: 'SEARCHBAR',
          });
        }}
        style={[styles.padding]}>
        <SmallMaterialIcon name="close" color={grey} />
      </Pressable>
      <TextInput
        value={text}
        onChangeText={text => setText(text)}
        style={[styles.text, styles.wide]}
      />
      <Pressable
        onPress={() => setTypeModal(1)}
        style={[styles.rowLayout, styles.mediumGap, styles.padding]}>
        <Text style={[styles.text]}>
          {type == 'filebrowser' && (
            <SmallMaterialIcon name="folder" color="#FFC107" />
          )}
          {type == 'webbrowser' && (
            <SmallMaterialIcon name="web" color="#4FC3F7" />
          )}
          {type == 'search' && (
            <SmallMaterialIcon name="magnify" color={grey} />
          )}
        </Text>
        <SmallMaterialIcon name="chevron-down" color={grey} />
      </Pressable>
      <Pressable
        onPress={() => {
          dispatch({
            type: 'MODIFYTABPATH',
            payload: {
              tabId: state.currentTab,
              value: text,
            },
          });
          dispatch({
            type: 'MODIFYTABTYPE',
            payload: {
              tabId: state.currentTab,
              value: type,
            },
          });
        }}
        style={[styles.padding]}>
        <SmallMaterialIcon name="arrow-right-bottom" />
      </Pressable>
    </Animated.View>
  );
}
