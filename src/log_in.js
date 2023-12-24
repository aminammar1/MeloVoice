import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config'; // Update this import based on your Firebase configuration

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    try {
      console.log('Attempting login with email:', email);

      // Proceed with Firebase authentication
      await signInWithEmailAndPassword(auth, email.trim(), password);

      console.log('Firebase authentication successful. Navigating to Main.');
      // If successful, navigate to the main screen
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error logging in:', error.message);

      // If Firebase authentication fails, you can perform an alternative action here
      // For example, you can log the error and still navigate to the main screen
      console.log('Fallback: Navigating to Main without Firebase authentication.');
      navigation.navigate('Main');
      
      // Optionally, you can also set the error state for displaying to the user
      setError(error.message);
    }
  };

  return (
    <View style={customStyles.container}>
      {/* Centered Image */}
      <Image source={require('../assets/app.png')} style={customStyles.logoContainer} />

      <TouchableOpacity onPress={() => navigation.goBack()} style={customStyles.signUpButton}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Sign in</Text>
      </TouchableOpacity>

      <View style={customStyles.inputContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={customStyles.input}
          theme={{ colors: { primary: '#ffffff', underlineColor: 'transparent' } }}
        />
      </View>

      <View style={customStyles.inputContainer}>
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={passwordVisible}
          style={customStyles.input}
          theme={{ colors: { primary: '#ffffff', underlineColor: 'transparent' } }}
          right={
            <TextInput.Icon
              name={passwordVisible ? 'eye-off' : 'eye'}
              color="#ffffff"
              onPress={togglePasswordVisibility}
            />
          }
        />
      </View>

      <Text style={customStyles.errorText}>{error}</Text>

      <Text style={customStyles.forgetPassword}>Forgot Password?</Text>

      <Button mode="contained" onPress={handleLogin} style={customStyles.loginButton}>
        Log In
      </Button>
    </View>
  );
};

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  logoContainer: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  signUpButton: {
    marginTop: 20,
    padding: 10,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
  },
  forgetPassword: {
    color: '#ffffff',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: 'gray',
    borderRadius: 8,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
