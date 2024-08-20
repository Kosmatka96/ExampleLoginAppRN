import firestore from '@react-native-firebase/firestore';

// Firestore collection reference
const usersCollection = firestore().collection('users');

// Function to add a new user
export const addUser = async (username: string, password: string) => {
  try {
    // Check if the username already exists
    const userDoc = await usersCollection.doc(username).get();
    if (userDoc.exists) {
      throw new Error('Username already exists');
    }

    // Add the new user to Firestore
    await usersCollection.doc(username).set({
      username: username,
      password: password, // Note: Storing passwords in plaintext is insecure. This is just for demonstration.
    });

    return {success: true, message: 'User added successfully'};
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return {success: false, message: errorMessage};
  }
};

// Function to get the full list of users
export const getUsers = async () => {
  try {
    const snapshot = await usersCollection.get();
    const usersList = snapshot.docs.map(doc => doc.data());

    return {success: true, data: usersList};
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return {success: false, message: errorMessage};
  }
};

// Function to check if a user exists
export const checkUserExists = async (username: string, password: string) => {
  try {
    const userDoc = await usersCollection.doc(username).get();
    if (userDoc.exists && userDoc.data()?.password === password) {
      return {success: true, message: 'Login successful'};
    } else {
      return {success: false, message: 'Invalid username or password'};
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return {success: false, message: errorMessage};
  }
};

// Function to delete a user
export const deleteUser = async (username: string) => {
  try {
    const userDoc = await usersCollection.doc(username).get();
    if (!userDoc.exists) {
      return {success: false, message: 'User does not exist'};
    }

    // Delete the user from Firestore
    await usersCollection.doc(username).delete();

    return {success: true, message: 'User deleted successfully'};
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return {success: false, message: errorMessage};
  }
};
