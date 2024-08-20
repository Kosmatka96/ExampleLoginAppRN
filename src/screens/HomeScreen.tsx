import React, {useEffect, useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContext} from '../navigation/AppNavigator';
import {useTheme, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen: React.FC = () => {
  const {setDrawerEnabled} = useContext(DrawerContext);
  const themeColor = useTheme();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setDrawerEnabled(true);

    // Retrieve the username from AsyncStorage
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername);
    };

    fetchUsername();
  }, [setDrawerEnabled]);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: themeColor.colors.background},
      ]}>
      <Text
        style={[
          styles.welcomeText,
          {
            color: themeColor.colors.secondary,
            backgroundColor: themeColor.colors.surfaceVariant,
          },
        ]}>
        Hello {username ? username : 'User'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 50,
  },
});

export default HomeScreen;
