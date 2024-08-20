import React, {useContext, useState} from 'react';
import {Button, TextInput, useTheme} from 'react-native-paper';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {DrawerContext} from '../navigation/AppNavigator';
import {checkUserExists, addUser} from '../service/firebaseServerAPI';
import {
  View,
  Image,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceHeight = Dimensions.get('window').height;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const {setDrawerEnabled} = useContext(DrawerContext);
  const themeColor = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Validation Error', 'Username and password cannot be empty.');
      return false;
    }
    return true;
  };

  const onLoginPress = async () => {
    if (!validateInputs()) {
      return;
    }

    const result = await checkUserExists(username, password);
    if (result.success) {
      // Save username to AsyncStorage
      await AsyncStorage.setItem('username', username);

      setDrawerEnabled(true);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'MainDrawerRef'}],
        }),
      );
    } else {
      Alert.alert('Login Failed', result.message);
    }
  };

  const onCreateAccountPress = async () => {
    if (!validateInputs()) {
      return;
    }

    const result = await addUser(username, password);
    if (result.success) {
      Alert.alert(
        'Account Created',
        'Your account has been created successfully.',
      );
      onLoginPress();
    } else {
      Alert.alert('Account Creation Failed', result.message);
    }
  };

  const styles = createStyles(themeColor);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.logoSpacer} />

          <Image
            style={styles.logoContainer}
            source={require('../../assets/logoPic.png')}
          />

          <View style={styles.inputSpacer} />

          <TextInput
            mode="flat"
            label="Enter your username"
            placeholder="Type in username"
            value={username}
            onChangeText={setUsername}
            style={styles.usernameInput}
          />

          <TextInput
            mode="flat"
            label="Enter your password"
            placeholder="Type in password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
          />

          <View style={styles.loginButtonSpacer} />

          <View style={styles.loginButtonContainer}>
            <Button
              mode="elevated"
              style={styles.loginButton}
              onPress={onLoginPress}>
              Login
            </Button>
          </View>

          <Button
            mode="text"
            onPress={onCreateAccountPress}
            labelStyle={styles.createAccountLabel}
            style={styles.createAccountButton}>
            Create new account
          </Button>

          <View style={styles.bottomSpacer} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const createStyles = (themeColor: any) =>
  StyleSheet.create({
    keyboardAvoidingView: {
      backgroundColor: themeColor.colors.background,
      flex: 1,
    },
    container: {
      backgroundColor: themeColor.colors.background,
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoSpacer: {
      flex: 0.128,
    },
    logoContainer: {
      flex: 0.45,
      aspectRatio: 1,
    },
    inputSpacer: {
      flex: 0.095,
    },
    usernameInput: {
      width: '90%',
      minHeight: 5,
      marginBottom: deviceHeight * 0.03,
    },
    passwordInput: {
      width: '90%',
    },
    loginButtonSpacer: {
      flex: 0.125,
    },
    loginButtonContainer: {
      flex: 0.22,
    },
    loginButton: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    createAccountLabel: {
      color: themeColor.colors.primary,
    },
    createAccountButton: {
      marginTop: 10,
    },
    bottomSpacer: {
      flex: 0.085,
    },
  });

export default LoginScreen;
