import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert, TouchableOpacity} from 'react-native';
import {useTheme, Text, Button} from 'react-native-paper';
import {getUsers, deleteUser} from '../service/firebaseServerAPI'; // Adjust the path as needed

const AnotherScreen: React.FC = () => {
  const themeColor = useTheme();
  const [users, setUsers] = useState<string[]>([]);
  const [userCount, setUserCount] = useState<number | null>(null); // null indicates no fetch yet

  const fetchUsers = async () => {
    const result = await getUsers();
    if (result.success && result.data) {
      const usernames = result.data.map(user => user.username);
      setUsers(usernames);
      setUserCount(usernames.length);
    } else {
      Alert.alert('Error', 'Failed to fetch users or no users found.');
    }
  };

  const handleDeleteUser = async (username: string) => {
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${username}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            const result = await deleteUser(username);
            if (result.success) {
              // Remove the deleted user from the local state
              const updatedUsers = users.filter(user => user !== username);
              setUsers(updatedUsers);
              setUserCount(updatedUsers.length);
              Alert.alert('Success', 'User deleted successfully.');
            } else {
              Alert.alert('Error', result.message);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: themeColor.colors.background},
      ]}>
      <Text style={[styles.userCountText, {color: themeColor.colors.primary}]}>
        Total number of users: {userCount !== null ? userCount : '???'}
      </Text>

      <Button
        mode="contained"
        onPress={fetchUsers}
        style={styles.fetchButton}
        labelStyle={{color: themeColor.colors.onPrimary}}>
        Fetch Users
      </Button>

      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.userItem}>
            <Text style={[styles.usernameText, {color: themeColor.colors.primary}]}>
              {item}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteUser(item)}
            />
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center', // Center content vertically
  },
  userCountText: {
    fontSize: 18, // Slightly smaller font size
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center', // Center the text horizontally
  },
  fetchButton: {
    marginBottom: 16,
    alignSelf: 'center', // Center the button horizontally
  },
  flatListContent: {
    flexGrow: 1, // Allows centering even if list is empty
  },
  userItem: {
    flexDirection: 'row', // Align text and delete button horizontally
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Space out text and delete button
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  usernameText: {
    fontSize: 16,
  },
  deleteButton: {
    width: 24,
    height: 24,
    backgroundColor: 'red',
    borderRadius: 12, // Make it circular
  },
});

export default AnotherScreen;
