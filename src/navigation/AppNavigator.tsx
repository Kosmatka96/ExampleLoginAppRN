import React, {useState, createContext, useCallback} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './../../src/screens/HomeScreen';
import AnotherScreen from './../../src/screens/AnotherScreen';
import DrawerContent from './../../src/screens/DrawerContent';
import LoginScreen from './../../src/screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Another: undefined;
  MainDrawerRef: undefined;
};

const AppStack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

// Create a context to manage the drawer's enabled/disabled state
export const DrawerContext = createContext<{
  drawerEnabled: boolean;
  setDrawerEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  drawerEnabled: false,
  setDrawerEnabled: () => {},
});

// Move the MainDrawer component outside of AppNavigator
const MainDrawer: React.FC<{drawerEnabled: boolean}> = ({drawerEnabled}) => {
  const themeColor = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={DrawerContentComponent}
      screenOptions={{
        swipeEnabled: drawerEnabled, // Controls whether the drawer can be swiped open
        headerStyle: {
          backgroundColor: themeColor.colors.surfaceVariant, // Set the background color
        },
        headerTintColor: themeColor.colors.secondary, // Set the text color
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Users" component={AnotherScreen} />
    </Drawer.Navigator>
  );
};

// Extract DrawerContentComponent to avoid recreation during render
const DrawerContentComponent = (props: any) => {
  return <DrawerContent {...props} />;
};

const AppNavigator: React.FC = () => {
  const [drawerEnabled, setDrawerEnabled] = useState(false);

  // Use useCallback to memoize the MainDrawer component with its props
  const renderMainDrawer = useCallback(() => {
    return <MainDrawer drawerEnabled={drawerEnabled} />;
  }, [drawerEnabled]);

  return (
    <DrawerContext.Provider value={{drawerEnabled, setDrawerEnabled}}>
      <NavigationContainer>
        <AppStack.Navigator initialRouteName="Login">
          <AppStack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <AppStack.Screen
            name="MainDrawerRef"
            component={renderMainDrawer}
            options={{headerShown: false, gestureEnabled: false}}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    </DrawerContext.Provider>
  );
};

export default AppNavigator;
