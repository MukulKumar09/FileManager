import {Text, View, ActivityIndicator} from 'react-native';
import {useEffect} from 'react';
import Animated, {
  Easing,
  ReduceMotion,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import styles from '../../styles/styles';
import {useSelector, useDispatch} from 'react-redux';
import useStartOperation from '../../Hooks/useStartOperation';
import useCache from '../../Hooks/useCache';
import useCollectAllItem from '../../Hooks/useCollectAllItems';

export default function OperationWindow() {
  const dispatch = useDispatch();
  const state = {
    tabs: useSelector(state => state.tabs),
    currentTab: useSelector(state => state.currentTab),
    progress: useSelector(state => state.progress),
    operationType: useSelector(state => state.operationType),
    itemInOperation: useSelector(state => state.itemInOperation),
    clipboardItems: useSelector(state => state.clipboardItems),
    operationDest: useSelector(state => state.operationDest),
    operationSource: useSelector(state => state.operationSource),
  };
  const progressWidth = useSharedValue(0);
  const animatedWidthStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));
  useEffect(() => {
    dispatch({
      type: 'OPERATIONDEST',
      payload: state.tabs[state.currentTab]['path'],
    });
  }, []);

  useEffect(() => {
    const asyncOperation = async () => {
      let collectedItems = await useCollectAllItem(
        state.clipboardItems,
        state.operationDest,
      );
      let totalSize = 0;
      collectedItems.forEach(item => {
        totalSize = totalSize + item['size'];
      });
      let completedSize = 0;
      const itemExistsModal = () =>
        dispatch({
          type: 'ITEMEXISTSMODAL',
        });
      const itemInOperation = payload =>
        dispatch({
          type: 'ITEMINOPERATION',
          payload: payload,
        });
      for (item of collectedItems) {
        completedSize = await useStartOperation(
          state,
          dispatch,
          item,
          itemExistsModal,
          itemInOperation,
          completedSize,
          totalSize,
        );
      }
      dispatch({
        type: 'SETPROGRESS',
        payload: ((completedSize / totalSize) * 100).toFixed(0),
      });
      let toastMessage;
      switch (state.operationType) {
        case -2: {
          toastMessage = 'Operation Cancelled';
          break;
        }
        case 0: {
          toastMessage = 'Copy successful.';
          break;
        }
        case 1: {
          toastMessage = 'Move successful.';
          break;
        }
      }
      dispatch({
        type: 'OPERATIONWINDOW',
      });
      itemInOperation('');
      useCache(dispatch, state.operationDest);
      state.operationType && useCache(dispatch, state.operationSource);
      dispatch({
        type: 'TOAST',
        payload: toastMessage,
      });
      dispatch({
        type: 'OPERATIONTYPE',
        payload: -1,
      });
      dispatch({
        type: 'CLEARCB',
      });
    };
    asyncOperation();
  }, [state.operationDest]);

  useEffect(() => {
    progressWidth.value = withTiming(state.progress, {
      duration: 730,
      easing: Easing.out(Easing.exp),
      reduceMotion: ReduceMotion.System,
    });
  }, [state.progress]);
  return (
    <View
      style={[
        styles.pill,
        styles.paddingCloseBottom,
        {
          alignItems: 'flex-start',
          overflow: 'hidden',
        },
      ]}>
      <Animated.View
        style={[
          styles.pillHighlight,
          {
            height: '100%',
            position: 'absolute',
          },
          animatedWidthStyle,
        ]}></Animated.View>
      <View
        style={[
          styles.rowLayout,
          ,
          {
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: 'space-between',
          },
        ]}>
        <View style={[styles.rowLayout, styles.mediumGap, styles.wide]}>
          <ActivityIndicator />
          <Text style={[styles.text, styles.smallText]}>
            ({state.progress}%) {state.operationType == 0 && 'Copy'}
            {state.operationType == 1 && 'Move'}
            {state.operationType == 2 && 'Delete'}
            {state.operationType == 3 && 'Zipp'}
            {state.operationType == -2 && 'Cancell'}
            ing {state.itemInOperation}
          </Text>
        </View>
        {/* <Text
                onPress={() => dispatch({
                    type: "OPERATIONTYPE",
                    payload: -2,
                })
                }
                style={[
                    styles.text,
                    styles.smallText,
                    {
                        textDecorationLine: 'underline'
                    }
                ]}
            >Cancel</Text> */}
      </View>
    </View>
  );
}
