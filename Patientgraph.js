import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomePage = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    // Navigate to the desired screen
    navigation.navigate('Interphase');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}> Welcome to Sugar Smart</Text>
      <Image
        source={require('./assets/Blood.png')} // Replace './path/to/blood_drop_icon.png' with the actual path to your blood drop icon
        style={styles.icon}
      />
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Align content vertically in the middle
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  heading: {
    fontSize: Dimensions.get('window').height * 0.03,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: Dimensions.get('window').height * 0.19, // Reduced margin for the blood drop icon
  },
  icon: {
    width: Dimensions.get('window').height * 0.200, // Adjust size as needed
    height: Dimensions.get('window').height * 0.200, // Adjust size as needed
    marginBottom: Dimensions.get('window').height * 0.07, // Adjust margin as needed
  },
  content: {
    alignItems: 'center', // Center align content
  },
  button: {
    backgroundColor: '#603F83FF',
    borderRadius: Dimensions.get('window').height * 0.07,
    paddingVertical: Dimensions.get('window').height * 0.010,
    paddingHorizontal: Dimensions.get('window').width * 0.175,
    top:Dimensions.get('window').width * 0.20,
  },
  buttonText: {
    fontSize: Dimensions.get('window').height * 0.03,
    color: '#FFFFFF',
    textAlign: 'center', // Center align the button text
  },
});

export default WelcomePage;
