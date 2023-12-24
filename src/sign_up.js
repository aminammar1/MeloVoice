import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { firebase } from '../config'; // Adjust the path based on your file structure

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = async () => {
    try {
      // Save user data to Firestore
      await firebase.firestore().collection('users').add({
        name,
        email,
        password,
      });

      // Navigate to the login screen after successfully creating the account
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Centered Image */}
      <Image source={require('../assets/app.png')} style={styles.logo} />

      <Text style={styles.signInText}>Sign up</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={[styles.signInText, styles.smallText]}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.signInText, styles.smallText, { marginLeft: 5 }]}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Updated background color to black
  },
  logo: {
    width: '50%', // Adjust the size as needed
    height: '20%', // Adjust the size as needed
    resizeMode: 'contain',
    marginBottom: 20,
  },
  signInText: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white', // Updated text color to white
  },
  smallText: {
    fontSize: 14, // Updated font size for small text
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'white', // Updated input background color to white
    color: 'black', // Updated text color to black
  },
  createAccountButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10, // Updated marginTop value
  },
});

export default SignUp;
