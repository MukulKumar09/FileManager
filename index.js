/**
 * @format
 */


import { AppRegistry } from 'react-native';
//import App from './old_files/App_full';
import { name as appName } from './app.json';
import AppContainer from './AppContainer';

AppRegistry.registerComponent(appName, () => AppContainer);
