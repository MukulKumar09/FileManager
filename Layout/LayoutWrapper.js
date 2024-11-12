import {StatusBar, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import styles, {backgroundColor} from '../styles/styles';
import useAppLaunch from '../Hooks/useAppLaunch';
import OperationWindow from '../Features/OperationWindow/OperationWindow';
import MediaViewer from '../Features/MediaViewer/MediaViewer';
import Windows from './Windows/Windows';
import Tabbar from './Tabs/Tabbar';
import Modals from '../Modals/Modals';

function LayoutWrapper() {
  const dispatch = useDispatch();
  const state = {
    operationWindow: useSelector(state => state.operationWindow),
    mediaBox: useSelector(state => state.mediaBox),
  };
  useEffect(() => {
    useAppLaunch(dispatch); //Runs on App Launch
  }, []);

  return (
    <>
      <StatusBar backgroundColor={backgroundColor} />
      {Boolean(state.mediaBox) && <MediaViewer />}
      <View style={[styles.wide]}>
        <Windows />
      </View>
      <Modals />
      {Boolean(state.operationWindow) && <OperationWindow />}
      <Tabbar />
    </>
  );
}
export default LayoutWrapper;
