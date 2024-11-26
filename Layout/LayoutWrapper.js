import {StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {backgroundColor} from '../styles/styles';
import useAppLaunch from '../Hooks/useAppLaunch';
import MediaViewer from '../Features/MediaViewer/MediaViewer';

import Windows from './Windows/Windows';
import Modals from '../Modals/Modals';

function LayoutWrapper() {
  const dispatch = useDispatch();
  const state = {
    mediaBox: useSelector(state => state.mediaBox),
  };

  useEffect(() => {
    useAppLaunch(dispatch); //Runs on App Launch
  }, []);

  return (
    <>
      <StatusBar backgroundColor={backgroundColor} />
      {Boolean(state.mediaBox) && <MediaViewer />}
      <Windows />
      <Modals />
    </>
  );
}
export default LayoutWrapper;
