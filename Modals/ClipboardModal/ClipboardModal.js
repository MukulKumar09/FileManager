import {Text, Pressable, View, Image, Modal} from 'react-native';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import styles, {backgroundColor} from '../../styles/styles';
import useIcon from '../../Hooks/useIcon';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';

export default function ClipboardModal(props) {
  const dispatch = useDispatch();
  const state = {
    clipBoardModal: useSelector(state => state.clipBoardModal),
    clipboardItems: useSelector(state => state.clipboardItems),
    operationType: useSelector(state => state.operationType),
  };
  return (
    <Modal
      onRequestClose={() =>
        dispatch({
          type: 'CLIPBOARDMODAL',
        })
      }
      visible={state.clipBoardModal}
      transparent={true}>
      <Animated.View
        entering={FadeInDown.duration(50)}
        exiting={FadeOutDown.duration(50)}
        style={[styles.wide]}>
        <Pressable
          onPress={() =>
            dispatch({
              type: 'CLIPBOARDMODAL',
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
              <MaterialIcon name="clipboard-outline" />
              <View>
                <Text style={[styles.text, styles.headingText]}>Clipboard</Text>
                <Text style={[styles.text, styles.smallDarkText]}>
                  {state.clipboardItems.length} items
                </Text>
              </View>
            </View>
            <Text
              style={[
                styles.text,
                styles.textDisabled,
                {
                  textDecorationLine: 'underline',
                },
              ]}
              onPress={() => {
                dispatch({
                  type: 'CLEARCB',
                });
              }}>
              Clear
            </Text>
          </View>
          <View style={[styles.divider]} />
          {Boolean(state.clipboardItems) &&
            Boolean(state.clipboardItems.length) &&
            [0, 1].includes(state.operationType) && (
              <View style={[styles.rowLayout, styles.padding]}>
                <Text style={[styles.textDisabled]}>
                  These Items are ready to{' '}
                  {state.operationType ? 'Move' : 'Copy'}.{' '}
                </Text>
                <Text
                  style={{textDecorationLine: 'underline'}}
                  onPress={() =>
                    dispatch({
                      type: 'OPERATIONTYPE',
                      payload: state.operationType == 1 ? 0 : 1,
                    })
                  }>
                  {state.operationType ? 'Copy' : 'Move'} instead
                </Text>
              </View>
            )}
          <View style={[styles.divider]} />
          <View
            style={[
              {
                flexDirection: 'column',
                width: '100%',
              },
            ]}>
            {state.clipboardItems && state.clipboardItems.length > 0 ? (
              state.clipboardItems.map((item, i) => (
                <View key={i} style={[styles.rowLayout]}>
                  <Pressable
                    style={[
                      styles.rowLayout,
                      styles.bigGap,
                      styles.padding,
                      styles.wide,
                    ]}>
                    {useIcon(item['fileType'])}
                    <Text style={[styles.text]}>{item['name']}</Text>
                  </Pressable>
                  <Pressable
                    onPressIn={() => {
                      dispatch({
                        type: 'DELETECB',
                        payload: item['path'],
                      });
                    }}
                    style={[styles.padding]}>
                    <MaterialIcon name="close" />
                  </Pressable>
                </View>
              ))
            ) : (
              <Text style={[styles.text, styles.textDisabled, styles.padding]}>
                No items
              </Text>
            )}
          </View>
          <View style={[styles.divider]} />
          <View
            style={[
              styles.wide,
              styles.padding,
              {
                width: '100%',
              },
            ]}>
            <Pressable
              style={[
                styles.pill,
                styles.centered,
                styles.padding,
                {
                  width: '100%',
                },
              ]}
              onPress={() =>
                dispatch({
                  type: 'CLIPBOARDMODAL',
                })
              }>
              <Text style={[styles.text]}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}
