import React, { useState } from 'react';
import { ScrollView, View, TextInput, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PatientSignup = () => {
  const [patientName, setPatientName] = useState(''); // Corrected state variable name
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const handleSignup = () => {
    // Handle signup logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {/* Content of the container at the top */}
        <Text style={styles.heading}> Profile </Text>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={patientName}
            onChangeText={setPatientName} // Corrected function name
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={contactNumber}
            onChangeText={setContactNumber}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-Mail</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: windowWidth * 0.05,
    paddingTop: windowHeight * 0.02,
  },
  topContainer: {
    paddingTop: 20,
    paddingRight: 30,
    backgroundColor: '#603F83FF',
    borderBottomColor: 'black',
    height: windowHeight * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 1.2,
    top: windowHeight * -0.02,
    right: windowWidth * 0.1,
  },
  heading: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    color: '#000000', // Change text color to white
  },
  formContainer: {
    flexGrow: 1,
    marginTop: windowHeight * 0.03,
    left: windowWidth * 0.1
  },
  inputContainer: {
    marginBottom: windowHeight * 0.02,
    paddingHorizontal: windowHeight * 0.001,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: windowWidth * 0.046,
    marginBottom: 5,
  },
  input: {
    fontSize: windowWidth * 0.04,
    borderColor: '#FFFFFF',
    borderRadius: windowWidth * 0.04,
    padding: windowWidth * 0.028,
    width: '80%',
    backgroundColor: '#BBB7B7',
    left: windowHeight * -0.002
  },
  button: {
    alignSelf: 'center',
    width: '30%',
    marginTop: windowHeight * 0.02,
    marginRight: windowHeight * 0.09,
    backgroundColor: '#603F83FF',
    borderRadius: windowWidth * 0.03,
    paddingVertical: windowWidth * 0.03,
    paddingHorizontal: windowWidth * 0.010,
    alignItems: 'center',

  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
  },
});

export default PatientSignup;
