/**
 * @format
 */


import { AppRegistry } from 'react-native';
//import App from './old_files/App_full';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
