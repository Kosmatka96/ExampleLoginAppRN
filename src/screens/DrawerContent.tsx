import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {Text, useTheme} from 'react-native-paper';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {CommonActions} from '@react-navigation/native';

const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const themeColor = useTheme(); // Access the colors from the theme
  const styles = createStyles(themeColor); // Generate styles based on the theme

  const handleLogout = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  };

  return (
    <DrawerContentScrollView style={styles.drawerContentScrollView} {...props}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.topSection}>
          <Text style={styles.label}>Custom Drawer Content</Text>
        </View>
      </SafeAreaView>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
        labelStyle={styles.drawerItemLabel} // Apply primary color to text
      />
      <DrawerItem
        label="List of Users"
        onPress={() => props.navigation.navigate('Users')}
        labelStyle={styles.drawerItemLabel} // Apply primary color to text
      />
      <DrawerItem
        label="Log out"
        onPress={handleLogout}
        labelStyle={styles.drawerItemLabel} // Apply primary color to text
      />
    </DrawerContentScrollView>
  );
};

const createStyles = (themeColor: any) =>
  StyleSheet.create({
    drawerContentScrollView: {
      backgroundColor: themeColor.colors.surfaceVariant,
    },
    safeAreaView: {
      backgroundColor: themeColor.colors.background,
    },
    topSection: {
      paddingVertical: 20,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: themeColor.colors.background, // Use theme color for border
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themeColor.colors.secondary,
    },
    drawerItemLabel: {
      color: themeColor.colors.secondary,
      backgroundColor: themeColor.colors.backdrop,
      padding: 20,
    },
  });

export default DrawerContent;
