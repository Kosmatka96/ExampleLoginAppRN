import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app';

if (!firebase.apps.length) {
  firebase.initializeApp({
    // Your Firebase Config
  });
}

AppRegistry.registerComponent(appName, () => App);
