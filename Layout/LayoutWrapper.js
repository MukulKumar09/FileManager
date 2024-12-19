import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import styles from '../styles/styles';
import Windows from './Windows/Windows';
import Tabbar from './Tabs/Tabbar';
import runAppLaunch from '../Hooks/runAppLaunch';
import {useEffect} from 'react';
import usePanHandler from '../Hooks/usePanHandler';
import Modals from './Modal/Modals';
import MediaViewerWrapper from './MediaViewerWrapper/MediaViewerWrapper';

export default function LayoutWrapper() {
  const dispatch = useDispatch();
  useEffect(() => {
    runAppLaunch(dispatch); //Runs on App Launch
  }, []);
  const {pan, translationX, translationY} = usePanHandler();
  return (
    <>
      <Modals />
      <GestureHandlerRootView>
        <GestureDetector gesture={pan}>
          <View style={[styles.wide]}>
            <Windows />
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
      <Tabbar translationX={translationX} translationY={translationY} />
      <MediaViewerWrapper />
    </>
  );
}
