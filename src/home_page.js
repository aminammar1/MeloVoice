import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const HomePage = ({ navigation }) => {
  const handleSignUpFree = () => {
    navigation.navigate('SignUp'); // Navigate to the SignUp screen
  };

  const handleContinueWithGoogle = async () => {
    // Your implementation for Google authentication
  };

  const handleContinueWithApple = async () => {
    // Your implementation for Apple authentication
  };

  const handleLogin = () => {
    navigation.navigate('Login'); // Navigate to the Login screen
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/app.png')} style={styles.logo} />
      <Text style={styles.headerText}>MeloVoice</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#878193' }]}
        onPress={handleSignUpFree}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#BDB3D2' }]}
        onPress={handleContinueWithGoogle}
      >
        <Text style={styles.buttonTextWithIcon}>Continue with Google</Text>
        {/* Adjust the icon size as needed */}
        <Image source={require('../assets/google.png')} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#E3DEEC' }]}
        onPress={handleContinueWithApple}
      >
        <Text style={styles.buttonTextWithIcon}>Continue with Apple</Text>
        {/* Adjust the icon size as needed */}
        <Image source={require('../assets/apple.png')} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FFFFFF' }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.divider} />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginTop: '3%',
  },
  logo: {
    width: '70%',
    height: '30%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 10,
  },
  button: {
    width: '60%',
    borderRadius: 4,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row', // Added for proper icon alignment
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextWithIcon: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  icon: {
    width: 20, // Adjust the icon size as needed
    height: 30, // Adjust the icon size as needed
  },
  divider: {
    backgroundColor: 'white',
    width: '40%',
    height: 1.5,
    marginTop: 20,
  },
});

export default HomePage;
