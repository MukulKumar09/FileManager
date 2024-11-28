import {useSelector, useDispatch} from 'react-redux';
import {View} from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import styles from '../styles/styles';
import Windows from './Windows/Windows';
import Tabbar from './Tabs/Tabbar';
import useAppLaunch from '../Hooks/useAppLaunch';
import {useEffect} from 'react';
import usePanHandler from '../Hooks/usePanHandler';

export default function LayoutWrapper() {
  const dispatch = useDispatch();
  const state = {
    dragNDropIcon: useSelector(state => state.dragNDropIcon),
  };

  useEffect(() => {
    useAppLaunch(dispatch); //Runs on App Launch
  }, []);
  const {pan, translationX, translationY} = usePanHandler(state.dragNDropIcon);

  return (
    <>
      <GestureHandlerRootView>
        <GestureDetector gesture={pan}>
          <View style={[styles.wide]}>
            <Windows />
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
      <Tabbar translationX={translationX} translationY={translationY} />
    </>
  );
}
